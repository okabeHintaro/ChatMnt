import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'C:\vscode\vue\src\components\vue'); // Substitua pelo caminho real

fs.readdir(componentsDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        if (file.endsWith('.vue')) {
            const vueFilePath = path.join(componentsDir, file);
            const cssFilePath = path.join(componentsDir, file.replace('.vue', '.css'));

            // Verifica se o arquivo CSS existe
            if (fs.existsSync(cssFilePath)) {
                const importStatement = `\n<style>\n@import './${file.replace('.vue', '.css')}';\n</style>\n`;

                // Lê o arquivo .vue e adiciona a importação no final
                fs.readFile(vueFilePath, 'utf8', (err, data) => {
                    if (err) throw err;

                    // Adiciona a importação se ainda não existir
                    if (!data.includes('@import')) {
                        const updatedData = data.trim() + importStatement;
                        fs.writeFile(vueFilePath, updatedData, 'utf8', (err) => {
                            if (err) throw err;
                            console.log(`CSS importado em ${file}`);
                        });
                    }
                });
            }
        }
    });
});
