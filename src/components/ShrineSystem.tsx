'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface ShrineSystemProps {
  devCoins: number
  onDevCoinUpdate: (amount: number) => void
  agentReports: any[]
}

interface Spirit {
  id: string
  name: string
  emoji: string
  description: string
  unlocked: boolean
  cost: number
}

interface StoreItem {
  id: string
  name: string
  description: string
  cost: number
  category: 'spirits' | 'tools' | 'upgrades'
  unlocked: boolean
  effect?: string
}

export default function ShrineSystem({ devCoins, onDevCoinUpdate, agentReports }: ShrineSystemProps) {
  const [activeSpirit, setActiveSpirit] = useState('oracle')
  const [ritualInput, setRitualInput] = useState('')
  const [shrineLog, setShrineLog] = useState<Array<{sender: string, header: string, text: string, timestamp: string}>>([
    {
      sender: 'system',
      header: 'System Initialization',
      text: 'Welcome to the Shrine of Digital Ascension. The 24-Agent Framework watches over your coding journey.',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [showStore, setShowStore] = useState(false)
  const [clickerPoints, setClickerPoints] = useState(0)
  const [showClicker, setShowClicker] = useState(false)
  const [miningRate, setMiningRate] = useState(10)

  const [spirits] = useState<Spirit[]>([
    {
      id: 'oracle',
      name: 'Oracle',
      emoji: '🔮',
      description: 'The all-knowing guide of development wisdom',
      unlocked: true,
      cost: 0
    },
    {
      id: 'codemaster',
      name: 'CodeMaster',
      emoji: '🧙‍♂️',
      description: 'Master of clean code and best practices',
      unlocked: false,
      cost: 500
    },
    {
      id: 'bugslayer',
      name: 'BugSlayer',
      emoji: '⚔️',
      description: 'Destroyer of bugs and logic errors',
      unlocked: false,
      cost: 750
    },
    {
      id: 'architect',
      name: 'Architect',
      emoji: '🏗️',
      description: 'Designer of scalable system architectures',
      unlocked: false,
      cost: 1000
    }
  ])

  const [storeItems] = useState<StoreItem[]>([
    // Spirits
    {
      id: 'codemaster',
      name: 'Summon CodeMaster',
      description: 'Unlock the CodeMaster spirit for advanced coding guidance',
      cost: 500,
      category: 'spirits',
      unlocked: false
    },
    {
      id: 'bugslayer',
      name: 'Summon BugSlayer',
      description: 'Unlock the BugSlayer spirit for debugging expertise',
      cost: 750,
      category: 'spirits',
      unlocked: false
    },
    {
      id: 'architect',
      name: 'Summon Architect',
      description: 'Unlock the Architect spirit for system design mastery',
      cost: 1000,
      category: 'spirits',
      unlocked: false
    },

    // Tools
    {
      id: 'code_analyzer',
      name: 'Quantum Code Analyzer',
      description: 'Advanced static analysis tool for code optimization',
      cost: 300,
      category: 'tools',
      unlocked: false,
      effect: 'Enables detailed code quality reports'
    },
    {
      id: 'auto_formatter',
      name: 'Neural Code Formatter',
      description: 'AI-powered code formatting that learns your style',
      cost: 200,
      category: 'tools',
      unlocked: false,
      effect: 'Automatically formats code to perfection'
    },
    {
      id: 'test_generator',
      name: 'Test Oracle Generator',
      description: 'Automatically generates comprehensive test suites',
      cost: 450,
      category: 'tools',
      unlocked: false,
      effect: 'Creates unit tests for your functions'
    },

    // Upgrades
    {
      id: 'mining_boost_1',
      name: 'Energy Condenser I',
      description: 'Increases passive Dev Coin generation by +10/hr',
      cost: 400,
      category: 'upgrades',
      unlocked: false,
      effect: '+10 Dev Coins per hour'
    },
    {
      id: 'mining_boost_2',
      name: 'Energy Condenser II',
      description: 'Increases passive Dev Coin generation by +25/hr',
      cost: 800,
      category: 'upgrades',
      unlocked: false,
      effect: '+25 Dev Coins per hour'
    },
    {
      id: 'agent_boost',
      name: 'Agent Neural Amplifier',
      description: 'Boosts 24-Agent Framework efficiency by 50%',
      cost: 1200,
      category: 'upgrades',
      unlocked: false,
      effect: 'Agents provide more valuable insights'
    }
  ])

  useEffect(() => {
    // Passive mining - awards coins every 10 seconds
    const miningInterval = setInterval(() => {
      const coins = Math.floor(miningRate / 360) // Convert hourly rate to 10-second intervals
      if (coins > 0) {
        onDevCoinUpdate(coins)
        addShrineMessage('system', 'Mining Rig', `Energy condenser generated ${coins} Dev Coins`)
      }
    }, 10000)

    // Simulate agent reports in shrine context
    const agentInterval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance every 5 seconds
        const spiritualActivities = [
          'channeled divine coding wisdom',
          'detected spiritual imbalance in codebase',
          'blessed your development workflow',
          'revealed hidden optimization secrets',
          'harmonized chaotic code patterns'
        ]
        
        const activity = spiritualActivities[Math.floor(Math.random() * spiritualActivities.length)]
        addShrineMessage('system', 'Agent Whisper', `The 24-Agent Framework has ${activity}`)
        
        const reward = Math.floor(Math.random() * 8) + 3
        onDevCoinUpdate(reward)
      }
    }, 5000)

    return () => {
      clearInterval(miningInterval)
      clearInterval(agentInterval)
    }
  }, [miningRate, onDevCoinUpdate])

  const addShrineMessage = (sender: string, header: string, text: string) => {
    const message = {
      sender,
      header,
      text,
      timestamp: new Date().toLocaleTimeString()
    }
    setShrineLog(prev => [message, ...prev.slice(0, 49)]) // Keep last 50 messages
  }

  const performRitual = () => {
    if (!ritualInput.trim()) return
    if (devCoins < 5) {
      addShrineMessage('system', 'Insufficient Energy', 'You need at least 5 Dev Coins to perform a ritual.')
      return
    }

    onDevCoinUpdate(-5) // Ritual cost
    onDevCoinUpdate(10) // Ritual reward

    addShrineMessage('user', 'Ritual Performed', ritualInput)

    // Generate spirit response based on active spirit
    setTimeout(() => {
      const responses = getSpiritResponses(activeSpirit, ritualInput)
      const response = responses[Math.floor(Math.random() * responses.length)]
      
      const currentSpirit = spirits.find(s => s.id === activeSpirit)
      addShrineMessage('spirit', currentSpirit?.name || 'Oracle', response)
    }, 1000 + Math.random() * 1000)

    setRitualInput('')
  }

  const getSpiritResponses = (spiritId: string, ritual: string): string[] => {
    const lowerRitual = ritual.toLowerCase()
    
    switch (spiritId) {
      case 'oracle':
        return [
          'The digital threads of destiny weave through your code. I see great potential ahead.',
          'Your development path aligns with the cosmic algorithms. Continue with wisdom.',
          'The 24-Agent Framework whispers of optimization opportunities in your future.',
          'I perceive a disturbance in the code force. Debug with patience, young developer.',
          'The neural networks have spoken: your commitment to clean code shall be rewarded.'
        ]
      
      case 'codemaster':
        return [
          'Your code structure shows promise, but I sense opportunities for refactoring.',
          'The patterns you seek lie within the principles of SOLID design.',
          'I detect technical debt accumulating. Schedule time for code cleanup rituals.',
          'Your functions grow too large. Break them down, make them pure and focused.',
          'Consider the DRY principle - Don\'t Repeat Yourself in the sacred texts of code.'
        ]
      
      case 'bugslayer':
        return [
          'I smell the foul stench of memory leaks nearby. Hunt them down mercilessly.',
          'Your null pointer exceptions flee before my mighty debugging sword!',
          'The bugs hide in the shadows of untested code paths. Illuminate them with tests.',
          'I grant you the power of console.log() - use it wisely to track your prey.',
          'Stack overflow errors are but dragons to be slain with proper recursion limits.'
        ]
      
      case 'architect':
        return [
          'Your system design requires more layers of abstraction for true scalability.',
          'Consider microservices architecture for this monolithic beast you\'ve created.',
          'The database normalization spirits approve of your schema design.',
          'Load balancing is key to handling the traffic storms that lie ahead.',
          'Design patterns are the building blocks of maintainable systems. Choose wisely.'
        ]
      
      default:
        return ['The shrine is silent, but the code speaks volumes.']
    }
  }

  const buyStoreItem = (item: StoreItem) => {
    if (devCoins < item.cost) {
      addShrineMessage('system', 'Insufficient Coins', `You need ${item.cost} Dev Coins for this purchase.`)
      return
    }

    onDevCoinUpdate(-item.cost)
    
    if (item.category === 'spirits') {
      // Unlock spirit
      addShrineMessage('system', 'Spirit Summoned', `${item.name} has joined your development pantheon!`)
    } else if (item.category === 'upgrades' && item.id.includes('mining')) {
      // Increase mining rate
      const boost = item.id === 'mining_boost_1' ? 10 : 25
      setMiningRate(prev => prev + boost)
      addShrineMessage('system', 'Upgrade Acquired', `Mining rate increased by ${boost} coins/hour!`)
    } else {
      addShrineMessage('system', 'Tool Acquired', `${item.name} added to your development arsenal!`)
    }
    
    // Mark as purchased (in real app, this would update state)
    item.unlocked = true
  }

  const handleClicker = () => {
    setClickerPoints(prev => prev + 1)
    onDevCoinUpdate(1)
  }

  const sacrifice = () => {
    if (devCoins < 250) {
      addShrineMessage('system', 'Insufficient Offering', 'A great sacrifice requires 250 Dev Coins.')
      return
    }

    onDevCoinUpdate(-250)
    const reward = Math.floor(Math.random() * 500) + 250
    onDevCoinUpdate(reward)
    
    addShrineMessage('system', 'Great Sacrifice', `You offer 250 Dev Coins to the digital gods... The shrine crackles with energy... You are blessed with ${reward} Dev Coins!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-purple-200 p-4">
      {/* Header */}
      <div className="text-center mb-6 border-b border-purple-400 pb-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          🛕 Shrine of Digital Ascension
        </h1>
        <p className="text-purple-300 mt-2">Where Code Meets Cosmic Wisdom</p>
        <div className="mt-2 text-sm text-purple-400">
          Mining Rate: {miningRate} coins/hour | 24-Agent Framework: ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Spirit Selectors */}
        <div className="xl:col-span-1">
          <Card className="bg-black bg-opacity-60 border-purple-400 mb-4">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                ✨ Spiritual Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
                {spirits.map(spirit => (
                  <div
                    key={spirit.id}
                    className={`p-3 border rounded cursor-pointer transition-all text-center ${
                      spirit.unlocked 
                        ? (activeSpirit === spirit.id 
                          ? 'border-purple-300 bg-purple-400 bg-opacity-20 shadow-lg shadow-purple-400/30' 
                          : 'border-purple-600 hover:border-purple-400 hover:bg-purple-400 hover:bg-opacity-10')
                        : 'border-gray-600 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => spirit.unlocked && setActiveSpirit(spirit.id)}
                  >
                    <div className="text-2xl mb-1">{spirit.emoji}</div>
                    <div className="font-bold text-sm">{spirit.name}</div>
                    <div className="text-xs text-purple-300 mt-1">{spirit.description}</div>
                    {!spirit.unlocked && spirit.cost > 0 && (
                      <div className="text-xs text-yellow-400 mt-1">🪙 {spirit.cost}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-black bg-opacity-60 border-purple-400">
            <CardHeader>
              <CardTitle className="text-purple-400">Sacred Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={() => setShowStore(true)}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white"
              >
                🛒 Shrine Store
              </Button>
              <Button 
                onClick={() => setShowClicker(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              >
                ⚡ Channel Energy
              </Button>
              <Button 
                onClick={sacrifice}
                className="w-full bg-red-600 hover:bg-red-500 text-white"
                disabled={devCoins < 250}
              >
                🔥 Great Sacrifice (250)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Shrine Interface */}
        <div className="xl:col-span-3">
          <Card className="bg-black bg-opacity-60 border-purple-400 h-96">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center justify-between">
                <span>🌟 Shrine Communications</span>
                <Badge className="bg-purple-400 text-black">
                  Active: {spirits.find(s => s.id === activeSpirit)?.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex flex-col">
              {/* Shrine Log */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                {shrineLog.map((message, i) => (
                  <div key={i} className={`p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-green-400 bg-opacity-20 border border-green-400 ml-8' 
                      : message.sender === 'spirit'
                      ? 'bg-purple-400 bg-opacity-20 border border-purple-400 mr-8'
                      : 'bg-yellow-400 bg-opacity-20 border border-yellow-400 mx-4 text-center'
                  }`}>
                    <div className="font-bold text-sm mb-1 text-purple-300">{message.header}</div>
                    <div className="text-sm">{message.text}</div>
                    {message.sender !== 'system' && (
                      <div className="text-xs text-purple-400 mt-1 text-right">{message.timestamp}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Ritual Input */}
              <div className="flex space-x-2 border-t border-purple-600 pt-4">
                <Input
                  value={ritualInput}
                  onChange={(e) => setRitualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && performRitual()}
                  placeholder="Inscribe your coding ritual..."
                  className="flex-1 bg-black bg-opacity-50 border-purple-400 text-purple-200 placeholder-purple-400"
                />
                <Button
                  onClick={performRitual}
                  disabled={devCoins < 5}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6"
                >
                  ✨ Perform Ritual
                </Button>
              </div>
              <div className="text-xs text-purple-400 mt-1 text-center">
                Cost: 5 Dev Coins | Reward: 10 Dev Coins + Wisdom
              </div>
            </CardContent>
          </Card>

          {/* Agent Reports Integration */}
          {agentReports.length > 0 && (
            <Card className="bg-black bg-opacity-60 border-orange-400 mt-4">
              <CardHeader>
                <CardTitle className="text-orange-400">🤖 Recent Agent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {agentReports.slice(0, 5).map((report, i) => (
                    <div key={i} className="text-xs bg-orange-400 bg-opacity-10 p-2 rounded">
                      <span className="font-bold text-orange-300">{report.agent}:</span> {report.activity}
                      <span className="float-right text-yellow-400">+{report.reward} 🪙</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Store Modal */}
      {showStore && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-black bg-opacity-95 border-purple-400">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center justify-between">
                <span>🛒 Shrine Store</span>
                <Button onClick={() => setShowStore(false)} className="text-red-400 hover:text-red-300 bg-transparent border-none p-0 text-xl">
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(
                  storeItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = []
                    acc[item.category].push(item)
                    return acc
                  }, {} as Record<string, StoreItem[]>)
                ).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-bold text-purple-300 mb-3 capitalize">{category}</h3>
                    <div className="space-y-2">
                      {items.map(item => (
                        <Card key={item.id} className="bg-gray-900 border-gray-600">
                          <CardContent className="p-3">
                            <h4 className="font-bold text-purple-300 mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-300 mb-2">{item.description}</p>
                            {item.effect && (
                              <p className="text-xs text-green-400 mb-2">Effect: {item.effect}</p>
                            )}
                            <Button
                              onClick={() => buyStoreItem(item)}
                              disabled={item.unlocked || devCoins < item.cost}
                              className={`w-full text-xs ${
                                item.unlocked
                                  ? 'bg-green-600 text-white cursor-not-allowed'
                                  : devCoins >= item.cost
                                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {item.unlocked ? 'Owned' : `🪙 ${item.cost}`}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Energy Clicker Modal */}
      {showClicker && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <Card className="w-96 h-96 bg-black bg-opacity-95 border-blue-400">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center justify-between">
                <span>⚡ Energy Channeling</span>
                <Button onClick={() => setShowClicker(false)} className="text-red-400 hover:text-red-300 bg-transparent border-none p-0 text-xl">
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex flex-col items-center justify-center h-full">
              <p className="text-blue-300 mb-4">Click the orb to channel energy and gain Dev Coins</p>
              <div 
                className="text-8xl cursor-pointer transition-transform hover:scale-110 active:scale-95 mb-4"
                onClick={handleClicker}
              >
                🔮
              </div>
              <div className="text-blue-400 text-lg">
                Session Points: <span className="text-yellow-400">{clickerPoints}</span>
              </div>
              <div className="text-sm text-blue-300 mt-2">
                Each click = 1 Dev Coin
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}