import cv2
import face_recognition
import json
import sys
import locale  
import os
sys.stdout.reconfigure(encoding='utf-8')
os.environ["PYTHONIOENCODING"] = "utf-8"
myLocale=locale.setlocale(category=locale.LC_ALL, locale="en_GB.UTF-8")

def enroll(email):
    video_capture = cv2.VideoCapture(0)
    face_data = {}
    face_saved = False

    print("Please position your face in front of the camera...")

    while True:
        ret, frame = video_capture.read()
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for (top, right, bottom, left) in face_locations:
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(frame, "Press 'S' to save face data", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        cv2.putText(frame, "Press 'Q' to quit", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        cv2.imshow('Face Capture', frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('s'):
            if face_encodings:
                face_data[email] = face_encodings[0].tolist()
                with open("python/face_data.json", "w") as f:
                    json.dump(face_data, f)
                print("✅ Face data saved successfully!")
                face_saved = True
                break 
            else:
                print("❌ Error: No face detected! Please try again.")
    
        if key == ord('q'):
            if not face_saved:
                print("❌ Error: No face was saved. Exiting...")
                sys.exit(1)  
                break

    video_capture.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    email = sys.argv[1]
    print(f"Enrolling user with email: {email}")
    enroll(email)
