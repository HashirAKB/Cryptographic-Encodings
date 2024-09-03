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

export default function EncodersAndDecoders() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [method, setMethod] = useState('asciiToBytes')
  const [placeholder, setPlaceholder] = useState('Enter text')
  const [key, setKey] = useState('')
  const [explanation, setExplanation] = useState('')
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
      let result
      let steps = []

      switch (method) {
        case 'asciiToBytes':
          result = asciiToBytes(input)
          steps = input.split('').map((char, index) => `'${char}' (ASCII ${char.charCodeAt(0)})`)
          setExplanation(`1. Split the input string into characters\n2. Convert each character to its ASCII value:\n   ${steps.join('\n   ')}\n3. Combine the ASCII values into an array`)
          break
        case 'bytesToAscii':
          result = bytesToAscii(JSON.parse(input))
          steps = JSON.parse(input).map(byte => `${byte} (ASCII '${String.fromCharCode(byte)}')`)
          setExplanation(`1. Parse the input as a JSON array\n2. Convert each byte to its ASCII character:\n   ${steps.join('\n   ')}\n3. Join the characters into a string`)
          break
        case 'arrayToHex':
          result = arrayToHex(JSON.parse(input))
          steps = JSON.parse(input).map(byte => `${byte} -> ${byte.toString(16).padStart(2, '0')}`)
          setExplanation(`1. Parse the input as a JSON array\n2. Convert each byte to a two-digit hexadecimal string:\n   ${steps.join('\n   ')}\n3. Join the hexadecimal strings`)
          break
        case 'hexToArray':
          result = hexToArray(input)
          steps = input.match(/.{1,2}/g).map(hex => `${hex} -> ${parseInt(hex, 16)}`)
          setExplanation(`1. Split the input into pairs of characters\n2. Convert each pair from hexadecimal to decimal:\n   ${steps.join('\n   ')}\n3. Combine the decimal values into an array`)
          break
        case 'arrayToBase64':
          result = arrayToBase64(JSON.parse(input))
          setExplanation(`1. Parse the input as a JSON array\n2. Convert the array to a string of characters\n3. Encode the string using Base64 encoding`)
          break
        case 'base64ToArray':
          result = base64ToArray(input)
          setExplanation(`1. Decode the Base64 input string\n2. Convert each character of the decoded string to its ASCII value\n3. Create an array from these ASCII values`)
          break
        case 'aesEncrypt':
          result = aesEncrypt(input, key)
          setExplanation(`1. Generate a random salt\n2. Derive an encryption key using PBKDF2\n3. Generate a random IV (Initialization Vector)\n4. Encrypt the input using AES in CBC mode\n5. Combine the salt, IV, and ciphertext\n6. Encode the result in Base64`)
          break
        case 'aesDecrypt':
          result = aesDecrypt(input, key)
          setExplanation(`1. Decode the Base64 input\n2. Extract the salt, IV, and ciphertext\n3. Derive the decryption key using PBKDF2\n4. Decrypt the ciphertext using AES in CBC mode`)
          break
        default:
          result = 'Invalid method'
          setExplanation('')
      }
      setOutput(JSON.stringify(result))
    } catch (error) {
      setOutput('Error: Invalid input')
      setExplanation('An error occurred. Please check your input and try again.')
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="w-full max-w-2xl space-y-6 bg-card rounded-lg shadow-lg p-8">
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
          <div className="space-y-2">
            <Label htmlFor="explanation">How it works</Label>
            <div
              id="explanation"
              className="p-4 bg-muted rounded-md min-h-[100px] whitespace-pre-wrap"
            >
              {explanation}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}