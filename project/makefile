set jsdoc_dir=C:\jsdoc-toolkit
set source_dir=source
set reference_dir=doc\reference

rmdir /s /q %reference_dir%
java -jar %jsdoc_dir%\jsrun.jar %jsdoc_dir%\app\run.js -a -r -t=%jsdoc_dir%\templates\jsdoc -d=%reference_dir% %source_dir%
