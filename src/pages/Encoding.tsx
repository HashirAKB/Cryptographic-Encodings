import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import CryptoJS from 'crypto-js'

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

function aesEncrypt(message: string, key: string): string {
  return CryptoJS.AES.encrypt(message, key).toString()
}

function aesDecrypt(ciphertext: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

const methodDescriptions = {
  asciiToBytes: "Converts ASCII text to an array of byte values",
  bytesToAscii: "Converts an array of byte values to ASCII text",
  arrayToHex: "Converts an array of byte values to a hexadecimal string",
  hexToArray: "Converts a hexadecimal string to an array of byte values",
  arrayToBase64: "Converts an array of byte values to a Base64 encoded string",
  base64ToArray: "Converts a Base64 encoded string to an array of byte values",
  aesEncrypt: "Encrypts plaintext using AES (Advanced Encryption Standard) with a provided key",
  aesDecrypt: "Decrypts AES encrypted ciphertext using the provided key"
}

export default function EncodingDemo() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [method, setMethod] = useState('asciiToBytes')
  const [placeholder, setPlaceholder] = useState('Enter text')
  const [key, setKey] = useState('')
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
      case 'aesEncrypt':
        setPlaceholder('Enter text to encrypt')
        break
      case 'aesDecrypt':
        setPlaceholder('Enter ciphertext to decrypt')
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
        case 'aesEncrypt':
          setOutput(aesEncrypt(input, key))
          break
        case 'aesDecrypt':
          setOutput(aesDecrypt(input, key))
          break
        default:
          setOutput('Invalid method')
      }
    } catch (error) {
      setOutput('Error: Invalid input')
    }
  }

  return (
    <TooltipProvider>
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
            {(method === 'aesEncrypt' || method === 'aesDecrypt') && (
              <div>
                <Label htmlFor="key">Encryption Key</Label>
                <Input
                  id="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter encryption key"
                />
              </div>
            )}
            <RadioGroup value={method} onValueChange={setMethod}>
              <div className="flex flex-wrap gap-4">
                {Object.entries(methodDescriptions).map(([value, description]) => (
                  <Tooltip key={value}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <Label htmlFor={value}>{value}</Label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
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
    </TooltipProvider>
  )
}