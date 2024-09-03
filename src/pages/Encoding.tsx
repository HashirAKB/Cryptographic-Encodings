import '../App.css'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"


// Encoding/decoding functions
function bytesToAscii(byteArray: number[]): string {
  return byteArray.map(byte => String.fromCharCode(byte)).join('')
}

function asciiToBytes(asciiString: string): number[] {
  return Array.from(asciiString).map(char => char.charCodeAt(0))
}

function arrayToHex(byteArray: number[]): string {
  return byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
}

function hexToArray(hexString: string): number[] {
  const result = []
  for (let i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16))
  }
  return result
}

function arrayToBase64(byteArray: number[]): string {
  return btoa(String.fromCharCode.apply(null, byteArray))
}

function base64ToArray(base64String: string): number[] {
  return Array.from(atob(base64String), char => char.charCodeAt(0))
}

function EncodersAndDecoders() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [method, setMethod] = useState('asciiToBytes')
  const [placeholder, setPlaceholder] = useState('Enter text')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    updatePlaceholder(method)
  }, [method])

  const updatePlaceholder = (selectedMethod: string) => {
    switch (selectedMethod) {
      case 'asciiToBytes':
        setPlaceholder('Enter text (e.g., "Hello")')
        break
      case 'bytesToAscii':
        setPlaceholder('Enter byte array (e.g., [72, 101, 108, 108, 111])')
        break
      case 'arrayToHex':
        setPlaceholder('Enter byte array (e.g., [72, 101, 108, 108, 111])')
        break
      case 'hexToArray':
        setPlaceholder('Enter hex string (e.g., "48656c6c6f")')
        break
      case 'arrayToBase64':
        setPlaceholder('Enter byte array (e.g., [72, 101, 108, 108, 111])')
        break
      case 'base64ToArray':
        setPlaceholder('Enter Base64 string (e.g., "SGVsbG8=")')
        break
      default:
        setPlaceholder('Enter input')
    }
  }

  const handleEncodeDecode = () => {
    try {
      switch (method) {
        case 'asciiToBytes':
          setOutput(JSON.stringify(asciiToBytes(input)))
          break
        case 'bytesToAscii':
          setOutput(bytesToAscii(JSON.parse(input)))
          break
        case 'arrayToHex':
          setOutput(arrayToHex(JSON.parse(input)))
          break
        case 'hexToArray':
          setOutput(JSON.stringify(hexToArray(input)))
          break
        case 'arrayToBase64':
          setOutput(arrayToBase64(JSON.parse(input)))
          break
        case 'base64ToArray':
          setOutput(JSON.stringify(base64ToArray(input)))
          break
        default:
          setOutput('Invalid method')
      }
    } catch (error) {
      setOutput('Error: Invalid input')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Public Key Cryptography - Encoding/Decoding</h1>
            <p className="text-sm text-muted-foreground mt-1">Built as part of #100xDev web3 cohort</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
            />
          </div>
          <RadioGroup value={method} onValueChange={setMethod}>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asciiToBytes" id="asciiToBytes" />
                <Label htmlFor="asciiToBytes">ASCII to Bytes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bytesToAscii" id="bytesToAscii" />
                <Label htmlFor="bytesToAscii">Bytes to ASCII</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="arrayToHex" id="arrayToHex" />
                <Label htmlFor="arrayToHex">Array to Hex</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hexToArray" id="hexToArray" />
                <Label htmlFor="hexToArray">Hex to Array</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="arrayToBase64" id="arrayToBase64" />
                <Label htmlFor="arrayToBase64">Array to Base64</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="base64ToArray" id="base64ToArray" />
                <Label htmlFor="base64ToArray">Base64 to Array</Label>
              </div>
            </div>
          </RadioGroup>
          <Button onClick={handleEncodeDecode} className="w-full">
            Encode/Decode
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="output">Output</Label>
          <div
            id="output"
            className="p-4 bg-muted rounded-md min-h-[100px] whitespace-pre-wrap break-all"
          >
            {output}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EncodersAndDecoders
