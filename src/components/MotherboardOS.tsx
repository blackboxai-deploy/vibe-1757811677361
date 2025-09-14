'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Component {
  id: string
  name: string
  type: string
  status: 'online' | 'offline' | 'processing'
  temperature: number
  usage: number
  position: { top: string; left: string; width: string; height: string }
  description: string
}

interface MotherboardOSProps {
  onDevCoinUpdate: (amount: number) => void
  onAgentReport: (report: any) => void
}

export default function MotherboardOS({ onDevCoinUpdate, onAgentReport }: MotherboardOSProps) {
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '🚀 Motherboard OS Terminal v1.0',
    '🤖 24-Agent Framework: ONLINE',
    '⚡ Neural pathways connected...'
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const [showTerminal, setShowTerminal] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [aiChat, setAiChat] = useState<Array<{role: string, message: string}>>([
    { role: 'assistant', message: 'Neural pathways connected. AI coprocessor online and ready for interfacing.' }
  ])
  const [aiInput, setAiInput] = useState('')
  const [performanceData, setPerformanceData] = useState({
    cpu: 23,
    ram: 42,
    gpu: 67,
    temp: 52,
    power: 340,
    aiLoad: 15
  })

  const [components] = useState<Component[]>([
    {
      id: 'cpu',
      name: 'Neural Processing Unit',
      type: 'processor',
      status: 'processing',
      temperature: 45,
      usage: 23,
      position: { top: '15%', left: '15%', width: '120px', height: '120px' },
      description: 'Intel Core i9-13900K - Quantum-Enhanced Neural Processor'
    },
    {
      id: 'ai-core',
      name: 'AI Coprocessor v2.0',
      type: 'ai',
      status: 'online',
      temperature: 38,
      usage: 15,
      position: { top: '40%', left: '75%', width: '80px', height: '60px' },
      description: '24-Agent Framework Controller - Neural Engine v2.0'
    },
    {
      id: 'ram-1',
      name: 'Memory Bank 1',
      type: 'memory',
      status: 'online',
      temperature: 32,
      usage: 42,
      position: { top: '15%', left: '45%', width: '100px', height: '20px' },
      description: '16GB DDR5-5600 - Code Memory Bank'
    },
    {
      id: 'ram-2',
      name: 'Memory Bank 2',
      type: 'memory',
      status: 'online',
      temperature: 34,
      usage: 38,
      position: { top: '20%', left: '45%', width: '100px', height: '20px' },
      description: '16GB DDR5-5600 - Data Memory Bank'
    },
    {
      id: 'gpu',
      name: 'AI Graphics Accelerator',
      type: 'graphics',
      status: 'processing',
      temperature: 72,
      usage: 67,
      position: { top: '50%', left: '10%', width: '200px', height: '40px' },
      description: 'RTX 4090 - AI Rendering Engine'
    },
    {
      id: 'storage',
      name: 'Storage Controller',
      type: 'storage',
      status: 'online',
      temperature: 41,
      usage: 28,
      position: { top: '15%', left: '75%', width: '80px', height: '40px' },
      description: '2TB NVMe SSD - Ultra-Fast Storage'
    },
    {
      id: 'network',
      name: 'Network Interface',
      type: 'network',
      status: 'online',
      temperature: 29,
      usage: 12,
      position: { top: '65%', left: '75%', width: '80px', height: '40px' },
      description: '1Gbps Ethernet - Network Controller'
    }
  ])

  useEffect(() => {
    // Simulate performance updates and agent activity
    const interval = setInterval(() => {
      setPerformanceData(prev => ({
        cpu: 15 + Math.random() * 30,
        ram: 35 + Math.random() * 20,
        gpu: 45 + Math.random() * 40,
        temp: 45 + Math.random() * 15,
        power: 280 + Math.random() * 80,
        aiLoad: Math.max(prev.aiLoad * 0.9, 5 + Math.random() * 10) // Gradually decrease AI load
      }))

      // Random agent activity
      if (Math.random() < 0.1) { // 10% chance every second
        const agentNames = ['CodeMate', 'IntelliPrompt', 'BugSeer', 'TestTitan', 'Profiler']
        const activities = [
          'detected performance optimization opportunity',
          'completed code analysis scan',
          'found potential bug pattern',
          'generated test suggestions',
          'optimized memory usage'
        ]
        
        const agent = agentNames[Math.floor(Math.random() * agentNames.length)]
        const activity = activities[Math.floor(Math.random() * activities.length)]
        
        onAgentReport({
          agent,
          activity,
          timestamp: new Date().toLocaleTimeString(),
          reward: Math.floor(Math.random() * 10) + 5
        })
        
        // Award dev coins for agent activity
        const reward = Math.floor(Math.random() * 10) + 5
        onDevCoinUpdate(reward)
        
        addTerminalMessage(`🤖 ${agent}: ${activity} (+${reward} Dev Coins)`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [onAgentReport, onDevCoinUpdate])

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component)
    addTerminalMessage(`🔍 ${component.name} selected - Status: ${component.status.toUpperCase()}`)
    
    // Award coins for component interaction
    onDevCoinUpdate(2)
  }

  const addTerminalMessage = (message: string) => {
    setTerminalOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`].slice(-50))
  }

  const handleTerminalCommand = (command: string) => {
    if (!command.trim()) return

    addTerminalMessage(`$ ${command}`)

    const cmd = command.toLowerCase().trim()
    
    if (cmd === 'help') {
      addTerminalMessage('Available commands: status, components, ai-status, clear, shrine, agents, mine')
    } else if (cmd === 'status') {
      addTerminalMessage(`System Status: OPERATIONAL | AI: ONLINE | Agents: 24/24 | Uptime: ${Math.floor(Math.random() * 120)}min`)
    } else if (cmd === 'components') {
      components.forEach(comp => {
        addTerminalMessage(`${comp.name}: ${comp.status.toUpperCase()} (${comp.usage}% load, ${comp.temperature}°C)`)
      })
    } else if (cmd === 'ai-status') {
      addTerminalMessage('AI Coprocessor: ONLINE | Load: 15% | 24-Agent Framework: ACTIVE')
      setShowAI(true)
    } else if (cmd === 'clear') {
      setTerminalOutput(['🚀 Motherboard OS Terminal v1.0'])
    } else if (cmd === 'shrine') {
      addTerminalMessage('🛕 Shrine System integration ready - Use mode switcher above')
    } else if (cmd === 'agents') {
      addTerminalMessage('🤖 24-Agent Framework active - Analyzing code patterns in background')
    } else if (cmd === 'mine') {
      const mined = Math.floor(Math.random() * 25) + 10
      onDevCoinUpdate(mined)
      addTerminalMessage(`⛏️ Mining complete! Earned ${mined} Dev Coins`)
    } else {
      addTerminalMessage(`Command not found: ${cmd}. Type 'help' for available commands.`)
    }

    setTerminalInput('')
  }

  const handleAIChat = (message: string) => {
    if (!message.trim()) return

    setAiChat(prev => [...prev, { role: 'user', message }])
    
    // Simulate AI processing
    setPerformanceData(prev => ({ ...prev, aiLoad: Math.min(prev.aiLoad + 20, 100) }))
    
    setTimeout(() => {
      const responses = [
        'Neural pathways processing your request. Analysis complete.',
        'Quantum circuits engaged. I detect patterns in your code that could be optimized.',
        'AI coprocessor running diagnostics. System performance is optimal.',
        'Processing through 24-agent framework. Multiple insights generated.',
        'Neural network activated. Your development workflow shows 87% efficiency.',
        'Analyzing codebase... Found 3 potential improvements. Shall I elaborate?'
      ]
      
      const response = responses[Math.floor(Math.random() * responses.length)]
      setAiChat(prev => [...prev, { role: 'assistant', message: response }])
      
      // Award coins for AI interaction
      onDevCoinUpdate(5)
    }, 1000)

    setAiInput('')
  }

  const getComponentColor = (type: string) => {
    switch (type) {
      case 'processor': return 'border-orange-400 text-orange-400'
      case 'ai': return 'border-purple-400 text-purple-400'
      case 'memory': return 'border-blue-400 text-blue-400'
      case 'graphics': return 'border-pink-400 text-pink-400'
      case 'storage': return 'border-yellow-400 text-yellow-400'
      case 'network': return 'border-green-400 text-green-400'
      default: return 'border-gray-400 text-gray-400'
    }
  }

  const getStatusAnimation = (status: string) => {
    switch (status) {
      case 'processing': return 'animate-pulse'
      case 'online': return ''
      case 'offline': return 'opacity-50'
      default: return ''
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden" style={{ 
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(0, 255, 65, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0, 153, 255, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(170, 0, 255, 0.05) 0%, transparent 50%),
        linear-gradient(135deg, #0A0A0A 0%, #0D4A2D 50%, #0A0A0A 100%)
      `
    }}>
      {/* Circuit Board Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {/* Horizontal traces */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#00FF41" strokeWidth="1" opacity="0.3"/>
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#0099FF" strokeWidth="1" opacity="0.3"/>
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#FF6600" strokeWidth="1" opacity="0.3"/>
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#AA00FF" strokeWidth="1" opacity="0.3"/>
        
        {/* Vertical traces */}
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#00FF41" strokeWidth="1" opacity="0.3"/>
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#0099FF" strokeWidth="1" opacity="0.3"/>
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#FF6600" strokeWidth="1" opacity="0.3"/>
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#AA00FF" strokeWidth="1" opacity="0.3"/>
        
        {/* Circuit nodes */}
        <circle cx="20%" cy="20%" r="3" fill="#00FF41" opacity="0.6"/>
        <circle cx="40%" cy="40%" r="3" fill="#0099FF" opacity="0.6"/>
        <circle cx="60%" cy="60%" r="3" fill="#FF6600" opacity="0.6"/>
        <circle cx="80%" cy="80%" r="3" fill="#AA00FF" opacity="0.6"/>
      </svg>

      {/* Motherboard Components */}
      {components.map((component) => (
        <div
          key={component.id}
          className={`absolute cursor-pointer border-2 rounded-lg p-2 transition-all hover:scale-105 hover:shadow-lg z-10 ${getComponentColor(component.type)} ${getStatusAnimation(component.status)} bg-black bg-opacity-80 backdrop-blur`}
          style={component.position}
          onClick={() => handleComponentClick(component)}
        >
          <div className="text-xs text-center">
            <div className="font-bold mb-1">{component.name.split(' ')[0]}</div>
            <div className="text-xs opacity-75">{component.usage}%</div>
            <div className="text-xs opacity-50">{component.temperature}°C</div>
          </div>
        </div>
      ))}

      {/* Status LEDs */}
      <div className="absolute top-5 left-[90%] w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
      <div className="absolute top-9 left-[90%] w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-12 left-[90%] w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50" style={{ animationDelay: '1s' }}></div>

      {/* Performance Monitor */}
      <Card className="absolute top-4 left-4 w-64 bg-black bg-opacity-90 border-green-400 text-green-400 backdrop-blur z-40">
        <CardContent className="p-3 text-xs">
          <div className="font-bold mb-2 flex items-center">⚡ System Monitor</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>CPU:</span>
              <span className="text-orange-400">{Math.floor(performanceData.cpu)}%</span>
            </div>
            <div className="flex justify-between">
              <span>RAM:</span>
              <span className="text-blue-400">{Math.floor(performanceData.ram)}%</span>
            </div>
            <div className="flex justify-between">
              <span>GPU:</span>
              <span className="text-purple-400">{Math.floor(performanceData.gpu)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Temp:</span>
              <span className="text-red-400">{Math.floor(performanceData.temp)}°C</span>
            </div>
            <div className="flex justify-between">
              <span>Power:</span>
              <span className="text-yellow-400">{Math.floor(performanceData.power)}W</span>
            </div>
            <div className="flex justify-between">
              <span>AI Load:</span>
              <span className="text-green-400">{Math.floor(performanceData.aiLoad)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Info Panel */}
      {selectedComponent && (
        <Card className="absolute top-4 right-4 w-80 h-96 bg-black bg-opacity-95 border-green-400 text-green-400 backdrop-blur z-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{selectedComponent.name}</h3>
              <Button 
                onClick={() => setSelectedComponent(null)}
                className="text-red-400 hover:text-red-300 bg-transparent border-none p-0 text-xl"
              >
                ×
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div><strong>Type:</strong> {selectedComponent.type}</div>
              <div><strong>Status:</strong> <Badge className={`${selectedComponent.status === 'online' ? 'bg-green-400 text-black' : 'bg-orange-400 text-black'}`}>{selectedComponent.status.toUpperCase()}</Badge></div>
              <div><strong>Usage:</strong> {selectedComponent.usage}%</div>
              <div><strong>Temperature:</strong> {selectedComponent.temperature}°C</div>
              <div className="mt-4">
                <strong>Description:</strong>
                <p className="mt-1 text-xs opacity-75">{selectedComponent.description}</p>
              </div>
              <div className="mt-4 p-2 bg-green-400 bg-opacity-10 rounded">
                <div className="text-xs">💡 Optimization Tips:</div>
                <div className="text-xs mt-1 opacity-75">
                  {selectedComponent.type === 'processor' && 'Consider enabling CPU boosting for better performance'}
                  {selectedComponent.type === 'ai' && 'AI coprocessor is running optimally with 24-agent framework'}
                  {selectedComponent.type === 'memory' && 'Memory usage is within normal parameters'}
                  {selectedComponent.type === 'graphics' && 'GPU is ideal for AI-accelerated development tasks'}
                  {selectedComponent.type === 'storage' && 'NVMe SSD provides excellent I/O performance'}
                  {selectedComponent.type === 'network' && 'Network latency is optimal for development workflows'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Terminal */}
      {showTerminal && (
        <Card className="fixed bottom-4 left-4 w-96 h-64 bg-black bg-opacity-95 border-green-400 text-green-400 backdrop-blur z-50">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-bold">motherboard@dev:~$</div>
              <Button 
                onClick={() => setShowTerminal(false)}
                className="text-red-400 hover:text-red-300 bg-transparent border-none p-0 text-xl"
              >
                ×
              </Button>
            </div>
            <div className="flex-1 text-xs overflow-y-auto font-mono space-y-1 mb-2">
              {terminalOutput.map((line, i) => (
                <div key={i} className="text-green-400">{line}</div>
              ))}
            </div>
            <div className="flex items-center">
              <span className="text-green-400 text-xs mr-2">$</span>
              <Input
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTerminalCommand(terminalInput)}
                className="flex-1 bg-transparent border-none outline-none text-green-400 p-0"
                placeholder="Enter command..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Chat */}
      {showAI && (
        <Card className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 h-80 bg-black bg-opacity-95 border-purple-400 text-purple-400 backdrop-blur z-50">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-bold">🤖 AI Neural Interface</div>
              <Button 
                onClick={() => setShowAI(false)}
                className="text-red-400 hover:text-red-300 bg-transparent border-none p-0 text-xl"
              >
                ×
              </Button>
            </div>
            <div className="flex-1 text-xs overflow-y-auto space-y-2 mb-2">
              {aiChat.map((chat, i) => (
                <div key={i} className={`p-2 rounded ${chat.role === 'user' ? 'bg-green-400 bg-opacity-10 text-green-400' : 'bg-purple-400 bg-opacity-10 text-purple-400'}`}>
                  {chat.message}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 text-xs mr-2">🧠</span>
              <Input
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAIChat(aiInput)}
                className="flex-1 bg-transparent border-none outline-none text-purple-400 p-0"
                placeholder="Ask the AI anything..."
              />
              <Button 
                onClick={() => handleAIChat(aiInput)}
                className="text-green-400 hover:text-green-300 ml-2 bg-transparent border-none p-0"
              >
                →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Access Toolbar */}
      <div className="fixed bottom-4 right-4 flex space-x-2 z-40">
        <Button
          onClick={() => setShowTerminal(true)}
          className="bg-gray-900 bg-opacity-80 border border-green-500 px-3 py-2 rounded text-green-400 hover:bg-green-500 hover:text-black transition-colors text-sm"
        >
          Terminal
        </Button>
        <Button
          onClick={() => setShowAI(true)}
          className="bg-gray-900 bg-opacity-80 border border-purple-500 px-3 py-2 rounded text-purple-400 hover:bg-purple-500 hover:text-black transition-colors text-sm"
        >
          AI Core
        </Button>
        <Button
          onClick={() => {
            const mined = Math.floor(Math.random() * 15) + 5
            onDevCoinUpdate(mined)
            addTerminalMessage(`⛏️ Quick mine! Earned ${mined} Dev Coins`)
          }}
          className="bg-gray-900 bg-opacity-80 border border-yellow-500 px-3 py-2 rounded text-yellow-400 hover:bg-yellow-500 hover:text-black transition-colors text-sm"
        >
          Mine
        </Button>
      </div>
    </div>
  )
}