## build the solution
msbuild.exe .\MendixCLIExtension.sln /t:Rebuild /p:Configuration=Release /p:Platform="Any CPU"

# remove the old extension
Remove-Item -Recurse .\resources\App\extensions\MendixCLIExtension\* -Force

# copy the extension to the Mendix project
Copy-Item -Recurse .\bin\Release\net8.0\* .\resources\App\extensions\MendixCLIExtension\ -Force