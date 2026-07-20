Set-Location "C:\Users\Administrator\Documents\app"
$env:PORT = "3008"
npx.cmd next dev -p 3008 *> "task-3008.log"
