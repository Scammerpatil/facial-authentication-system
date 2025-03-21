import cv2
import numpy as np
import face_recognition
import json
import sys
import time
import locale  
import os
sys.stdout.reconfigure(encoding='utf-8')
os.environ["PYTHONIOENCODING"] = "utf-8"
myLocale=locale.setlocale(category=locale.LC_ALL, locale="en_GB.UTF-8")

def login(email):
    try:
        with open("python/face_data.json", "r") as f:
            saved_face_data = json.load(f)
    except FileNotFoundError:
        print("❌ Error: Face data file not found!")
        sys.exit(1)

    if email not in saved_face_data:
        print("❌ No user found with this email.")
        sys.exit(1)
    
    stored_encoding = np.array(saved_face_data[email]) 

    video_capture = cv2.VideoCapture(0)
    print("🔍 Scanning for a face... Stay still for 5 seconds to verify.")

    start_time = time.time()
    match_time = 0
    verified = False

    while True:
        ret, frame = video_capture.read()
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for face_encoding, (top, right, bottom, left) in zip(face_encodings, face_locations):
            match = face_recognition.compare_faces([stored_encoding], face_encoding, tolerance=0.5)
            
            if match[0]:
                if match_time == 0:
                    match_time = time.time() 
                
                elapsed_match_time = time.time() - match_time
                
                if elapsed_match_time >= 5: 
                    print("✅ Login Successful!")
                    verified = True
                    break 
                
                label = f"Verifying... {int(5 - elapsed_match_time)}s"
                color = (0, 255, 0)
            else:
                match_time = 0 
                label = "Face Not Recognized"
                color = (0, 0, 255)

            cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
            cv2.putText(frame, label, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

        cv2.imshow('Face Verification', frame)

        if verified or (time.time() - start_time >= 20):
            break

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    video_capture.release()
    cv2.destroyAllWindows()

    if not verified:
        print("❌ Face does not match. Access Denied!")
        sys.exit(1)


if __name__ == "__main__":
    email = sys.argv[1]
    print(f"🔐 Verifying login for: {email}")
    login(email)
