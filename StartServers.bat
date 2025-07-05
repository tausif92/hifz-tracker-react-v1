@echo off

echo Use the following when you want to run simply by opening 2 cmd and run 2 commands.
@REM echo Starting backend server...
@REM start cmd /k "cd C:\MyDrive\Projects\hifz-tracker-react-v1\server && npm start"
@REM echo Starting frontend server...
@REM start cmd /k "cd C:\MyDrive\Projects\hifz-tracker-react-v1\client && npm start"

echo Use the following when you want to run in cmd in minimized state
start "" /min cmd /c "cd C:\MyDrive\Projects\hifz-tracker-react-v1\server && npm start"
start "" /min cmd /c "cd C:\MyDrive\Projects\hifz-tracker-react-v1\client && npm start"

echo Use the following commands when you want to run the cmd invisibly in the background.
echo To stop the servers, you need to go to task manager and kill node background processes.
@REM echo Starting backend server...
@REM start "" /B cmd /c "cd C:\MyDrive\Projects\hifz-tracker-react-v1\server && npm start"
@REM echo Starting frontend server...
@REM start "" /B cmd /c "cd C:\MyDrive\Projects\hifz-tracker-react-v1\client && npm start"

echo Both servers started in separate windows.
