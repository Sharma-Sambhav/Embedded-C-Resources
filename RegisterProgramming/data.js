window._quiz_RegisterProgramming = [
  {
    "q": "Why should you never do <code>GPIOA->MODER = (0x1 << 10)</code>?",
    "opts": ["It is too slow", "It zeroes all other bits in the register, breaking other pins", "It requires more Flash", "MODER is read-only"],
    "ans": 1,
    "exp": "Assigning directly overwrites the whole register. Other pins' mode bits become 00 (Input). Always read-modify-write."
  },
  {
    "q": "To clear bits [3:2] and set them to 0b11, which sequence is correct?",
    "opts": ["reg |= (0x3 << 2)", "reg &= ~(0x3 << 2); reg |= (0x3 << 2)", "reg = (0x3 << 2)", "reg ^= (0x3 << 2)"],
    "ans": 1,
    "exp": "First clear the field (AND with inverted mask), then OR in the new value. A single OR would OR over the old bits, not replace them."
  },
  {
    "q": "What does the BRR register on a UART typically hold?",
    "opts": ["The last received byte", "A baud rate divisor derived from the peripheral clock", "The parity error flag", "A pointer to the TX buffer"],
    "ans": 1,
    "exp": "BRR (Baud Rate Register) = PCLK / desired_baud. For 16 MHz / 115200 ≈ 139."
  }
];
window._ex_RegisterProgramming = [
  {
    "title": "Read-modify-write practice",
    "diff": "easy",
    "desc": "Write the correct two-line sequence to set pin 3 of GPIOB as output (MODER bits [7:6] = 0b01) without disturbing any other pins.\n\n<code>GPIOB->MODER = ?  // your code here</code>",
    "hint": "Clear the 2-bit field first, then OR in the value.",
    "answer": null,
    "ansCode": "GPIOB->MODER &= ~(0x3 << 6);   // clear bits [7:6]\nGPIOB->MODER |=  (0x1 << 6);   // set to Output (01)"
  },
  {
    "title": "Baud rate calculation",
    "diff": "medium",
    "desc": "The APB2 clock is 84 MHz. You want USART1 at 9600 baud. What value do you write to BRR? Show the calculation. What is the actual baud rate error?",
    "hint": "BRR = PCLK / baud_rate (integer division for standard UART). Error = (actual_baud - desired) / desired × 100%.",
    "answer": null,
    "ansCode": "// BRR = 84_000_000 / 9600 = 8750  (0x222E)\nUSART1->BRR = 8750;\n// Actual baud = 84M / 8750 = 9600.0 baud  (0% error here)\n// Real MCUs may round: check 84M/9600 = 8750.0 exact"
  },
  {
    "title": "Challenge: SPI peripheral from scratch",
    "diff": "hard",
    "desc": "Without using HAL or any library, write the bare-metal register sequence to configure SPI1 in master mode, CPOL=0 CPHA=0, 8-bit data, baud = PCLK/16. Then send one byte and wait for the transfer to complete.\n\nHint: SPI CR1 bits: BR[5:3] = baud divisor, MSTR=2, SPE=6. SR: TXE=1, BSY=7.",
    "hint": "Enable clocks first (RCC). Configure pins as AF. Set CR1 fields using RMW. Enable SPI (SPE bit). Write DR to start transfer. Wait for TXE then BSY=0.",
    "answer": null,
    "ansCode": "// 1. Clocks\nRCC->APB2ENR |= (1 << 12);  // SPI1 clock\nRCC->AHB1ENR |= (1 << 0);   // GPIOA clock\n\n// 2. Pins: PA5=SCK, PA6=MISO, PA7=MOSI as AF5\nGPIOA->MODER  &= ~(0x3F << 10);\nGPIOA->MODER  |=  (0x2A << 10);   // AF mode\nGPIOA->AFR[0] |=  (0x555 << 20);  // AF5\n\n// 3. Configure SPI1\nSPI1->CR1 = 0;\nSPI1->CR1 |= (0x3 << 3);   // BR = 011 → PCLK/16\nSPI1->CR1 |= (1 << 2);     // MSTR = master\nSPI1->CR1 |= (1 << 6);     // SPE = enable\n\n// 4. Send byte\nwhile (!(SPI1->SR & (1 << 1))) { }  // wait TXE\nSPI1->DR = 0xA5;\nwhile (SPI1->SR & (1 << 7)) { }     // wait BSY=0"
  }
];
