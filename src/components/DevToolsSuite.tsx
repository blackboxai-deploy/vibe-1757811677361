'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface DevToolsSuiteProps {
  devCoins: number
  onDevCoinUpdate: (amount: number) => void
  agentReports: any[]
}

interface Project {
  id: string
  name: string
  type: 'html' | 'react' | 'static'
  files: ProjectFile[]
  lastModified: Date
}

interface ProjectFile {
  id: string
  name: string
  content: string
  type: 'html' | 'css' | 'js' | 'md'
}

export default function DevToolsSuite({ devCoins, onDevCoinUpdate, agentReports }: DevToolsSuiteProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null)
  const [codeInput, setCodeInput] = useState('')
  const [output, setOutput] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '🚀 DevTools Suite initialized',
    '🤖 24-Agent Framework connected',
    '⚡ Neural pathways ready for development'
  ])

  // Sample starter projects
  useEffect(() => {
    const starterProjects: Project[] = [
      {
        id: 'landing-page',
        name: 'Neural Landing Page',
        type: 'html',
        lastModified: new Date(),
        files: [
          {
            id: 'index-html',
            name: 'index.html',
            type: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neural Development Platform</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="hero">
            <h1 class="neural-title">Neural Development Platform</h1>
            <p class="hero-subtitle">Where AI meets code creation</p>
            <button class="cta-button" onclick="activateNeural()">Activate Neural Mode</button>
        </header>
        
        <section class="features">
            <div class="feature-card">
                <div class="feature-icon">🧠</div>
                <h3>AI-Powered Coding</h3>
                <p>24-Agent framework assists your development</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Optimized workflows for maximum productivity</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3>Future Ready</h3>
                <p>Built for next-generation development</p>
            </div>
        </section>
    </div>
    <script src="script.js"></script>
</body>
</html>`
          },
          {
            id: 'style-css',
            name: 'style.css',
            type: 'css',
            content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    color: #00ff41;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.hero {
    text-align: center;
    padding: 4rem 0;
}

.neural-title {
    font-size: 3.5rem;
    background: linear-gradient(45deg, #00ff41, #0099ff, #aa00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    text-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
}

.hero-subtitle {
    font-size: 1.2rem;
    color: #888;
    margin-bottom: 2rem;
}

.cta-button {
    background: linear-gradient(45deg, #00ff41, #0099ff);
    color: black;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0, 255, 65, 0.6);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
}

.feature-card {
    background: rgba(0, 255, 65, 0.1);
    border: 1px solid #00ff41;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.feature-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(0, 255, 65, 0.4);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    color: #00ff41;
    margin-bottom: 1rem;
}

.feature-card p {
    color: #ccc;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .neural-title {
        font-size: 2.5rem;
    }
    
    .container {
        padding: 1rem;
    }
}`
          },
          {
            id: 'script-js',
            name: 'script.js',
            type: 'js',
            content: `// Neural Development Platform JavaScript
console.log('🧠 Neural systems online');

function activateNeural() {
    console.log('⚡ Activating neural mode...');
    
    // Add some visual flair
    document.body.style.background = 'linear-gradient(135deg, #0f0f23 0%, #2d1b69 50%, #1a0d4a 100%)';
    
    // Create particle effect
    createParticles();
    
    // Update button
    const button = document.querySelector('.cta-button');
    button.textContent = 'Neural Mode Activated ⚡';
    button.style.background = 'linear-gradient(45deg, #aa00ff, #ff0040)';
    
    // Add pulsing effect to title
    const title = document.querySelector('.neural-title');
    title.style.animation = 'pulse 2s infinite';
    
    setTimeout(() => {
        alert('🤖 Welcome to Neural Development Mode! AI agents are now monitoring your creativity.');
    }, 500);
}

function createParticles() {
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = \`
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00ff41;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.7;
        left: \${Math.random() * 100}vw;
        top: \${Math.random() * 100}vh;
        animation: float \${2 + Math.random() * 3}s linear infinite;
    \`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 5000);
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = \`
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            text-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
        }
        50% {
            text-shadow: 0 0 50px rgba(0, 255, 65, 0.8), 0 0 70px rgba(0, 153, 255, 0.6);
        }
    }
\`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Neural landing page loaded successfully');
    
    // Add some ambient particles
    setTimeout(createParticles, 1000);
    setInterval(createParticles, 10000);
});`
          }
        ]
      }
    ]

    setProjects(starterProjects)
    setActiveProject(starterProjects[0])
    setActiveFile(starterProjects[0].files[0])
    setCodeInput(starterProjects[0].files[0].content)
  }, [])

  const addToConsole = (message: string) => {
    setConsoleOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`].slice(-20))
  }

  const createNewProject = () => {
    const projectName = prompt('Enter project name:')
    if (!projectName) return

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      type: 'html',
      lastModified: new Date(),
      files: [
        {
          id: 'index-html',
          name: 'index.html',
          type: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
</head>
<body>
    <h1>Welcome to ${projectName}</h1>
    <p>Start building your amazing project here!</p>
</body>
</html>`
        }
      ]
    }

    setProjects(prev => [...prev, newProject])
    setActiveProject(newProject)
    setActiveFile(newProject.files[0])
    setCodeInput(newProject.files[0].content)
    
    onDevCoinUpdate(10)
    addToConsole(`✨ New project "${projectName}" created! (+10 Dev Coins)`)
  }

  const saveFile = () => {
    if (!activeFile || !activeProject) return

    // Update file content
    const updatedFile = { ...activeFile, content: codeInput }
    const updatedFiles = activeProject.files.map(f => f.id === activeFile.id ? updatedFile : f)
    const updatedProject = { ...activeProject, files: updatedFiles, lastModified: new Date() }
    
    setProjects(prev => prev.map(p => p.id === activeProject.id ? updatedProject : p))
    setActiveProject(updatedProject)
    setActiveFile(updatedFile)
    
    onDevCoinUpdate(3)
    addToConsole(`💾 File "${activeFile.name}" saved! (+3 Dev Coins)`)

    // AI Agent feedback simulation
    setTimeout(() => {
      const insights = [
        'CodeMate: Code structure looks clean! Consider adding comments.',
        'LintWhisperer: Formatting is consistent. Well done!',
        'BugSeer: No obvious issues detected in this code.',
        'PatternGuru: Good use of semantic HTML structure.',
        'Profiler: Code looks optimized for performance.'
      ]
      const insight = insights[Math.floor(Math.random() * insights.length)]
      addToConsole(`🤖 ${insight}`)
    }, 1000)
  }

  const addNewFile = () => {
    if (!activeProject) return

    const fileName = prompt('Enter file name (with extension):')
    if (!fileName) return

    const extension = fileName.split('.').pop()?.toLowerCase()
    const fileType = extension === 'css' ? 'css' : extension === 'js' ? 'js' : extension === 'md' ? 'md' : 'html'

    const newFile: ProjectFile = {
      id: Date.now().toString(),
      name: fileName,
      type: fileType,
      content: getTemplateContent(fileType, fileName)
    }

    const updatedProject = {
      ...activeProject,
      files: [...activeProject.files, newFile],
      lastModified: new Date()
    }

    setProjects(prev => prev.map(p => p.id === activeProject.id ? updatedProject : p))
    setActiveProject(updatedProject)
    setActiveFile(newFile)
    setCodeInput(newFile.content)
    
    onDevCoinUpdate(5)
    addToConsole(`📄 New file "${fileName}" created! (+5 Dev Coins)`)
  }

  const getTemplateContent = (type: string, fileName: string): string => {
    switch (type) {
      case 'css':
        return `/* ${fileName} - Styles for your project */

body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
}

/* Add your styles here */
`
      case 'js':
        return `// ${fileName} - JavaScript functionality

console.log('📜 ${fileName} loaded successfully');

// Add your JavaScript code here
`
      case 'md':
        return `# ${fileName.replace('.md', '')}

This is a markdown file for your project documentation.

## Features

- Feature 1
- Feature 2
- Feature 3

## Getting Started

Instructions for using your project...
`
      default:
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName.replace('.html', '')}</title>
</head>
<body>
    <h1>New Page</h1>
    <p>Start building here!</p>
</body>
</html>`
    }
  }

  const runCode = () => {
    if (!activeFile) return

    addToConsole(`🚀 Running ${activeFile.name}...`)
    
    if (activeFile.type === 'html') {
      // Create a preview of HTML
      setOutput(codeInput)
      addToConsole('✅ HTML preview generated')
      onDevCoinUpdate(2)
    } else if (activeFile.type === 'js') {
      // Simulate JavaScript execution
      try {
        // This is a simple simulation - in a real app you'd use a sandboxed execution environment
        setOutput('JavaScript executed successfully (simulated)')
        addToConsole('✅ JavaScript executed')
        onDevCoinUpdate(4)
      } catch (error) {
        setOutput(`Error: ${error}`)
        addToConsole(`❌ JavaScript error: ${error}`)
      }
    } else {
      setOutput(codeInput)
      addToConsole(`✅ ${activeFile.type.toUpperCase()} processed`)
      onDevCoinUpdate(1)
    }

    // Agent simulation
    setTimeout(() => {
      const agentFeedback = [
        'Profiler: Code execution completed in 0.23ms',
        'TestTitan: Consider adding unit tests for this function',
        'BugSeer: No runtime errors detected',
        'FlowAnalyzer: Code flow is efficient and readable'
      ]
      const feedback = agentFeedback[Math.floor(Math.random() * agentFeedback.length)]
      addToConsole(`🤖 ${feedback}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 text-blue-200 p-4">
      {/* Header */}
      <div className="text-center mb-6 border-b border-blue-400 pb-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          🛠️ DevTools Suite
        </h1>
        <p className="text-blue-300 mt-2">Neural-Enhanced Development Environment</p>
        <div className="mt-2 text-sm text-blue-400">
          Active Project: {activeProject?.name || 'None'} | Files: {activeProject?.files.length || 0}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Project Sidebar */}
        <div className="xl:col-span-1">
          <Card className="bg-black bg-opacity-60 border-blue-400 mb-4">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center justify-between">
                <span>📁 Projects</span>
                <Button 
                  onClick={createNewProject}
                  className="text-xs bg-blue-600 hover:bg-blue-500 text-white"
                >
                  + New
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {projects.map(project => (
                <div
                  key={project.id}
                  className={`p-2 border rounded cursor-pointer transition-all ${
                    activeProject?.id === project.id
                      ? 'border-blue-300 bg-blue-400 bg-opacity-20'
                      : 'border-blue-600 hover:border-blue-400 hover:bg-blue-400 hover:bg-opacity-10'
                  }`}
                  onClick={() => {
                    setActiveProject(project)
                    setActiveFile(project.files[0])
                    setCodeInput(project.files[0].content)
                  }}
                >
                  <div className="font-bold text-sm">{project.name}</div>
                  <div className="text-xs text-blue-300">{project.files.length} files</div>
                  <div className="text-xs text-blue-400">{project.type.toUpperCase()}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* File Explorer */}
          {activeProject && (
            <Card className="bg-black bg-opacity-60 border-blue-400">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center justify-between">
                  <span>📄 Files</span>
                  <Button 
                    onClick={addNewFile}
                    className="text-xs bg-green-600 hover:bg-green-500 text-white"
                  >
                    + File
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {activeProject.files.map(file => (
                  <div
                    key={file.id}
                    className={`p-2 text-sm border rounded cursor-pointer transition-all ${
                      activeFile?.id === file.id
                        ? 'border-cyan-300 bg-cyan-400 bg-opacity-20'
                        : 'border-blue-600 hover:border-cyan-400'
                    }`}
                    onClick={() => {
                      setActiveFile(file)
                      setCodeInput(file.content)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{file.name}</span>
                      <Badge className={`text-xs ${
                        file.type === 'html' ? 'bg-orange-400 text-black' :
                        file.type === 'css' ? 'bg-blue-400 text-black' :
                        file.type === 'js' ? 'bg-yellow-400 text-black' :
                        'bg-gray-400 text-black'
                      }`}>
                        {file.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Editor Area */}
        <div className="xl:col-span-4">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black bg-opacity-60 border border-blue-400">
              <TabsTrigger value="editor" className="text-blue-400 data-[state=active]:bg-blue-400 data-[state=active]:text-black">
                ✏️ Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-blue-400 data-[state=active]:bg-blue-400 data-[state=active]:text-black">
                👁️ Preview
              </TabsTrigger>
              <TabsTrigger value="console" className="text-blue-400 data-[state=active]:bg-blue-400 data-[state=active]:text-black">
                🖥️ Console
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="mt-4">
              <Card className="bg-black bg-opacity-60 border-blue-400">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center justify-between">
                    <span>Code Editor: {activeFile?.name || 'No file selected'}</span>
                    <div className="space-x-2">
                      <Button 
                        onClick={saveFile}
                        disabled={!activeFile}
                        className="bg-green-600 hover:bg-green-500 text-white"
                      >
                        💾 Save
                      </Button>
                      <Button 
                        onClick={runCode}
                        disabled={!activeFile}
                        className="bg-purple-600 hover:bg-purple-500 text-white"
                      >
                        🚀 Run
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="w-full h-96 bg-black bg-opacity-80 border-blue-400 text-blue-200 font-mono text-sm"
                    placeholder={activeFile ? `Start coding in ${activeFile.name}...` : 'Select a file to start coding...'}
                  />
                  <div className="mt-2 text-xs text-blue-400">
                    Lines: {codeInput.split('\n').length} | Characters: {codeInput.length}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <Card className="bg-black bg-opacity-60 border-blue-400">
                <CardHeader>
                  <CardTitle className="text-blue-400">Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {output && activeFile?.type === 'html' ? (
                    <div className="bg-white rounded p-4 h-96 overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: output }} />
                    </div>
                  ) : (
                    <div className="bg-gray-900 rounded p-4 h-96 overflow-auto">
                      <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                        {output || 'Run your code to see output here...'}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="console" className="mt-4">
              <Card className="bg-black bg-opacity-60 border-blue-400">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center justify-between">
                    <span>Development Console</span>
                    <Button 
                      onClick={() => setConsoleOutput([])}
                      className="text-xs bg-red-600 hover:bg-red-500 text-white"
                    >
                      Clear
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded p-4 h-96 overflow-y-auto">
                    <div className="font-mono text-sm space-y-1">
                      {consoleOutput.map((line, i) => (
                        <div key={i} className={`${
                          line.includes('❌') ? 'text-red-400' :
                          line.includes('✅') ? 'text-green-400' :
                          line.includes('🤖') ? 'text-purple-400' :
                          line.includes('⚠️') ? 'text-yellow-400' :
                          'text-blue-400'
                        }`}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Agent Reports */}
          {agentReports.length > 0 && (
            <Card className="bg-black bg-opacity-60 border-orange-400 mt-4">
              <CardHeader>
                <CardTitle className="text-orange-400">🤖 Recent Agent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {agentReports.slice(0, 6).map((report, i) => (
                    <div key={i} className="text-xs bg-orange-400 bg-opacity-10 p-2 rounded border border-orange-600">
                      <span className="font-bold text-orange-300">{report.agent}:</span>
                      <div className="text-orange-200">{report.activity}</div>
                      <span className="float-right text-yellow-400">+{report.reward} 🪙</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}