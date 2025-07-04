@echo off

echo Starting backend server...
start cmd /k "cd C:\MyDrive\Projects\hifz-tracker-react-v1\server && npm start"

echo Starting frontend server...
start cmd /k "cd C:\MyDrive\Projects\hifz-tracker-react-v1\client && npm start"

echo Both servers started in separate windows.