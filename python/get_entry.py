import tkinter as tk
from tkinter import Label, messagebox
import cv2
import face_recognition
import numpy as np
import sys
import os
import locale  
sys.stdout.reconfigure(encoding='utf-8')
os.environ["PYTHONIOENCODING"] = "utf-8"
myLocale=locale.setlocale(category=locale.LC_ALL, locale="en_GB.UTF-8")
import pickle
import sys
from PIL import Image, ImageTk

sys.stdout.reconfigure(encoding='utf-8')
os.environ["PYTHONIOENCODING"] = "utf-8"
locale.setlocale(category=locale.LC_ALL, locale="en_GB.UTF-8")

ENCODINGS_FILE = "python/encodings.pkl"

# Load encodings
def load_encodings(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Encodings file '{file_path}' not found.")
    with open(file_path, "rb") as file:
        return pickle.load(file)

# Main UI function
def tkinter_face_entry_check():
    try:
        data = load_encodings(ENCODINGS_FILE)
        known_face_encodings = data["encodings"]
        known_face_names = data["names"]
    except FileNotFoundError as e:
        messagebox.showerror("Error", str(e))
        return

    root = tk.Tk()
    root.title("Face Entry Verification")

    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        messagebox.showerror("Error", "Unable to access the camera.")
        return

    lbl_video = Label(root)
    lbl_video.pack()

    lbl_status = Label(root, text="Press 'S' to verify face...", font=("Arial", 14))
    lbl_status.pack(pady=10)

    current_frame = [None]
    verified_result = {"name": None, "status": "No face detected."}

    def process_frame():
        ret, frame = cam.read()
        if not ret:
            lbl_status.config(text="Failed to capture frame.")
            return

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        current_frame[0] = rgb_frame

        img = Image.fromarray(rgb_frame)
        imgtk = ImageTk.PhotoImage(image=img)
        lbl_video.imgtk = imgtk
        lbl_video.configure(image=imgtk)
        lbl_video.after(10, process_frame)

    def verify_face(event=None):
        frame = current_frame[0]
        if frame is None:
            lbl_status.config(text="No frame available.")
            return

        face_locations = face_recognition.face_locations(frame)
        if face_locations:
            try:
                face_encodings = face_recognition.face_encodings(frame, face_locations)
                for face_encoding in face_encodings:
                    matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.5)
                    face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                    best_match_index = np.argmin(face_distances) if matches else None

                    if best_match_index is not None and matches[best_match_index]:
                        name = known_face_names[best_match_index]
                        lbl_status.config(text=f"✅ Resident Detected: {name}", fg="green")
                        verified_result["name"] = name
                        verified_result["status"] = "Resident"
                    else:
                        lbl_status.config(text="❌ Unknown Visitor Detected", fg="red")
                        verified_result["status"] = "Visitor"
            except Exception as e:
                lbl_status.config(text=f"Error in recognition: {e}", fg="orange")
                verified_result["status"] = f"Error: {e}"
        else:
            lbl_status.config(text="No face detected.", fg="blue")
            verified_result["status"] = "No face detected"

        # Wait 5 seconds then destroy window and print result
        root.after(5000, finalize_and_close)

    def finalize_and_close():
        cam.release()
        root.destroy()
        if verified_result["status"] == "Resident":
            print(f"{verified_result['name']}")
        elif verified_result["status"] == "Visitor":
            print("Visitor")
        else:
            print(f"{verified_result['status']}")

    def on_closing():
        cam.release()
        root.destroy()

    root.bind("<s>", verify_face)
    root.bind("<S>", verify_face)
    root.protocol("WM_DELETE_WINDOW", on_closing)

    process_frame()
    root.mainloop()

# Run the app
if __name__ == "__main__":
    tkinter_face_entry_check()
