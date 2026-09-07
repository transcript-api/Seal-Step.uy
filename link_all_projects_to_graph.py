import os
from pathlib import Path
from datetime import datetime

VAULT_DIR = Path(r'C:\Users\USUARIO\Documents\Obsidian Vault\NEURO WEBs')
DESKTOP_DIR = Path(r'C:\Users\USUARIO\Desktop\Skill webs diferenciadas')

def sync_write(rel_path, content):
    for base in [VAULT_DIR, DESKTOP_DIR]:
        target = base / rel_path
        target.parent.mkdir(parents=True, exist_ok=True)
        try:
            with open(target, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"Error escribiendo {target}: {e}")

print("Iniciando vinculación profunda de todas las notas de proyectos (chats) al grafo...")

proj_dir = VAULT_DIR / '08_PROJECTS'
if not proj_dir.exists():
    print("No se encontró 08_PROJECTS")
    exit(1)

project_files = [f for f in proj_dir.iterdir() if f.suffix == '.md']
print(f"Procesando {len(project_files)} archivos de proyectos...")

for pf in project_files:
    try:
        with open(pf, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        fname = pf.name
        
        # Determine specific connections based on project theme
        specific_skills = ""
        if 'sealstep' in fname.lower() or 'calzado' in fname.lower() or '458fbde5' in fname.lower():
            specific_skills = """- [[wiki/entities/The_Drop_Component|Entidad: The Drop (Video & Touch Carousel)]]
- [[wiki/skills/instagram-a-web|Skill: Instagram a Web]]
- [[wiki/skills/web-scrolling|Skill: Web Scrolling]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Concepto: Diseño Editorial vs Catálogo Plano]]
- [[wiki/concepts/Conversion_y_Psicologia|Concepto: Conversión y Psicología de Compra Natural]]
- [[VIDEOS ENTRENAMIENTO/Video 001- Analisis Tecnico|Video 001 - Análisis Técnico Base]]
- [[VIDEOS ENTRENAMIENTO/Video 009 - Analisis tecnico|Video 009 - Micro-Interacciones & Smooth Scroll]]
- [[VIDEOS ENTRENAMIENTO/Video 010 - Analisis tecnico|Video 010 - Psicología de Conversión & Carrito WhatsApp]]"""
        elif 'landing' in fname.lower() or 'interactiva' in fname.lower():
            specific_skills = """- [[wiki/skills/web-scrolling|Skill: Web Scrolling & Scroll Video]]
- [[wiki/concepts/Diseno_Editorial_vs_Catalogo|Concepto: Diseño Editorial]]
- [[Performance|Guía de Performance & Core Web Vitals]]
- [[VIDEOS ENTRENAMIENTO/Video 002 - Analisis Tecnico|Video 002 - Animaciones]]
- [[VIDEOS ENTRENAMIENTO/Video 004 - Analisis Tecnico|Video 004 - Interacciones]]"""
        else:
            specific_skills = """- [[wiki/entities/Nextjs_React|Next.js 16 + React 19]]
- [[wiki/entities/Tailwind_CSS|Tailwind CSS]]
- [[Error|Repositorio Central de Fallos]]
- [[VIDEOS ENTRENAMIENTO/Video 003 - Analisis Tecnico|Video 003 - Arquitectura]]
- [[VIDEOS ENTRENAMIENTO/Video 005 - Analisis Tecnico|Video 005 - Optimización]]"""

        connections_block = f"""

---

## 🔗 Conexiones del Grafo & Red Neuronal de Conocimiento:
### 🏛️ Núcleo & Manuales:
- [[index|Índice Maestro del Sistema]]
- [[AGENTS|Manual Operativo del Agente (Método Karpathy)]]
- [[01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico|Diccionario: Lenguaje Natural ➔ Término Técnico]]
- [[09_ERRORES_Y_SOLUCIONES/Errores_Comunes_Frontend_y_Soluciones|Checklist de Errores Comunes de IA]]
- [[Prompt|Biblioteca Maestra de Prompts]]
- [[Performance|Rendimiento Web]]
- [[Error|Repositorio de Fallos]]

### 💡 Conceptos, Entidades & Skills Aplicadas:
{specific_skills}

### 🔄 Proyectos Relacionados en el Historial:
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|SealStep: Rediseño Editorial THE DROP]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_307c55ee|SealStep: Catálogo y Talles]]
- [[08_PROJECTS/Proyecto_Landing_Interactiva_b8752f30|Landing Interactiva Hero]]
- [[10_SOURCE_INDEX/SOURCE_INDEX|Source Index Maestro]]
"""
        # If connections already exist, remove old one and add fresh comprehensive one
        if '## 🔗 Conexiones del Grafo' in content:
            content = content.split('## 🔗 Conexiones del Grafo')[0]
            
        new_content = content.strip() + connections_block
        sync_write(f'08_PROJECTS/{fname}', new_content)
        print(f"-> Conectado exitosamente al grafo: {fname}")
        
    except Exception as e:
        print(f"Error vinculando {pf.name}: {e}")

# Also update Diccionario, Componentes and Errores to link to all projects
diccionario_path = VAULT_DIR / '01_DICCIONARIO_INTENCIONES' / 'Diccionario_Lenguaje_Santi_A_Tecnico.md'
if diccionario_path.exists():
    with open(diccionario_path, 'r', encoding='utf-8', errors='ignore') as f:
        d_text = f.read()
    if '### 📁 Proyectos Reales de Donde Proviene este Vocabulario:' not in d_text:
        d_text += """

---

## 🔗 Conexiones del Grafo:
### 📁 Proyectos Reales de Donde Proviene este Vocabulario:
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_458fbde5|Proyecto SealStep: Rediseño Editorial THE DROP]]
- [[08_PROJECTS/Proyecto_SealStep_ECommerce_Calzado_307c55ee|Proyecto SealStep: Catálogo y Talles]]
- [[08_PROJECTS/Proyecto_Landing_Interactiva_b8752f30|Proyecto Landing Interactiva Hero]]
- [[index|Índice Maestro]]
- [[AGENTS|Manual de Agentes]]
- [[Error|Repositorio Central de Fallos]]
"""
        sync_write('01_DICCIONARIO_INTENCIONES/Diccionario_Lenguaje_Santi_A_Tecnico.md', d_text)

print("\n¡Todos los proyectos/chats quedaron 100% interconectados en el Grafo de Obsidian!")
