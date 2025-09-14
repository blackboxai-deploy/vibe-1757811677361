'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import MotherboardOS from '@/components/MotherboardOS'
import ShrineSystem from '@/components/ShrineSystem'
import AgentFramework from '@/components/AgentFramework'
import DevToolsSuite from '@/components/DevToolsSuite'

export default function HomePage() {
  const [isBooted, setIsBooted] = useState(false)
  const [activeMode, setActiveMode] = useState('motherboard')
  const [devCoins, setDevCoins] = useState(100)
  const [agentReports, setAgentReports] = useState([])

  useEffect(() => {
    // Boot sequence
    const bootTimer = setTimeout(() => {
      setIsBooted(true)
    }, 3000)

    return () => clearTimeout(bootTimer)
  }, [])

  const handleModeSwitch = (mode: string) => {
    setActiveMode(mode)
  }

  const handleDevCoinUpdate = (amount: number) => {
    setDevCoins(prev => prev + amount)
  }

  const handleAgentReport = (report: any) => {
    setAgentReports(prev => [report, ...prev.slice(0, 9)]) // Keep last 10 reports
  }

  if (!isBooted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 text-green-400 animate-pulse">⚡</div>
          <div className="text-3xl font-bold mb-4 text-green-400">MOTHERBOARD OS</div>
          <div className="text-lg mb-8 text-orange-400">Neural Development Platform</div>
          <div className="w-96 h-4 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
          <div className="mt-4 text-green-400 font-mono">Initializing 24-Agent Framework...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden">
      {/* Main Interface Router */}
      <div className="relative w-full h-screen">
        {/* Mode Switcher - Always visible */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex space-x-2 bg-gray-900 bg-opacity-90 backdrop-blur rounded-lg p-2 border border-green-400">
            <Button
              onClick={() => handleModeSwitch('motherboard')}
              className={`px-4 py-2 text-xs ${activeMode === 'motherboard' 
                ? 'bg-green-400 text-black' 
                : 'bg-transparent text-green-400 border border-green-400'}`}
            >
              🖥️ Motherboard
            </Button>
            <Button
              onClick={() => handleModeSwitch('shrine')}
              className={`px-4 py-2 text-xs ${activeMode === 'shrine' 
                ? 'bg-purple-400 text-black' 
                : 'bg-transparent text-purple-400 border border-purple-400'}`}
            >
              🛕 Shrine
            </Button>
            <Button
              onClick={() => handleModeSwitch('devtools')}
              className={`px-4 py-2 text-xs ${activeMode === 'devtools' 
                ? 'bg-blue-400 text-black' 
                : 'bg-transparent text-blue-400 border border-blue-400'}`}
            >
              🛠️ DevTools
            </Button>
            <Button
              onClick={() => handleModeSwitch('agents')}
              className={`px-4 py-2 text-xs ${activeMode === 'agents' 
                ? 'bg-orange-400 text-black' 
                : 'bg-transparent text-orange-400 border border-orange-400'}`}
            >
              🤖 Agents
            </Button>
          </div>
        </div>

        {/* Dev Coins Display */}
        <div className="absolute top-4 right-4 z-50">
          <Badge className="bg-yellow-400 text-black px-4 py-2 text-lg font-bold">
            🪙 {devCoins} Dev Coins
          </Badge>
        </div>

        {/* Interface Components */}
        <div className="w-full h-full">
          {activeMode === 'motherboard' && (
            <MotherboardOS 
              onDevCoinUpdate={handleDevCoinUpdate}
              onAgentReport={handleAgentReport}
            />
          )}

          {activeMode === 'shrine' && (
            <ShrineSystem 
              devCoins={devCoins}
              onDevCoinUpdate={handleDevCoinUpdate}
              agentReports={agentReports}
            />
          )}

          {activeMode === 'devtools' && (
            <DevToolsSuite 
              devCoins={devCoins}
              onDevCoinUpdate={handleDevCoinUpdate}
              agentReports={agentReports}
            />
          )}

          {activeMode === 'agents' && (
            <AgentFramework 
              onReport={handleAgentReport}
              reports={agentReports}
            />
          )}
        </div>

        {/* Background Neural Network Animation */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="w-full h-full opacity-10">
            {/* Circuit traces */}
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Vertical traces */}
            <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-orange-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-red-400 to-transparent animate-pulse" style={{ animationDelay: '2.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}