window._quiz_BitManipulation = [
  {
    "q": "How do you clear bit 6 of <code>reg</code> without touching other bits?",
    "opts": ["reg = reg & (1<<6)", "reg &= ~(1<<6)", "reg &= (1<<6)", "reg ^= (1<<6)"],
    "ans": 1,
    "exp": "AND with the inverted mask. ~(1<<6) has all bits set except bit 6, so ANDing forces bit 6 to 0 and keeps all others."
  },
  {
    "q": "What is <code>0b00101100 | (1 << 0)</code>?",
    "opts": ["0b00101100", "0b00101101", "0b00101110", "0b10101100"],
    "ans": 1,
    "exp": "OR sets bit 0. 0b00101100 | 0b00000001 = 0b00101101."
  },
  {
    "q": "To set a 2-bit field at bits [7:6] to 0b10, which expression is correct?",
    "opts": ["reg |= 0b10", "reg = (reg & ~0xC0) | 0b10", "reg = (reg & ~(0x3<<6)) | (0x2<<6)", "reg |= (0x3 << 6)"],
    "ans": 2,
    "exp": "You must first clear the field (& ~(0x3<<6)) then OR in the value shifted to the right position ((0x2<<6))."
  }
];
window._ex_BitManipulation = [
  {
    "title": "Set and check a flag",
    "diff": "easy",
    "desc": "You have a status register <code>uint8_t SR = 0x00</code>. Write the expressions to: (1) set bit 4, (2) check if bit 4 is set, (3) clear bit 4.",
    "hint": "Set: |= (1<<n). Check: & (1<<n). Clear: &= ~(1<<n).",
    "answer": null,
    "ansCode": "SR |= (1 << 4);           // set\nif (SR & (1 << 4)) { }    // check\nSR &= ~(1 << 4);          // clear"
  },
  {
    "title": "Extract a bitfield",
    "diff": "medium",
    "desc": "A UART config register holds the stop bits in bits [13:12]. Given <code>uint32_t CR2 = 0x00003000</code>, extract the stop-bit field into a variable <code>stop</code> as a value 0–3.",
    "hint": "First mask the field, then shift right. Mask: <code>& (0x3 << 12)</code>. Shift: <code>>> 12</code>.",
    "answer": null,
    "ansCode": "uint32_t stop = (CR2 >> 12) & 0x3;   // stop = 3 (0b11)"
  },
  {
    "title": "Modify a multi-bit field",
    "diff": "medium",
    "desc": "GPIO MODER uses 2 bits per pin. Without disturbing any other pin, set pin 7 to Alternate Function mode (0b10). Pin 7's field is at bits [15:14].",
    "hint": "Clear the 2-bit field first: <code>&= ~(0x3 << 14)</code>. Then OR in the new value: <code>|= (0x2 << 14)</code>.",
    "answer": null,
    "ansCode": "GPIOA->MODER &= ~(0x3 << 14);   // clear pin 7 field\nGPIOA->MODER |=  (0x2 << 14);   // set to AF mode"
  },
  {
    "title": "Challenge: bit reversal",
    "diff": "hard",
    "desc": "Reverse the bits of a <code>uint8_t</code> without using any library function. E.g. <code>0b10110001</code> → <code>0b10001101</code>. Write the function body.",
    "hint": "Loop 8 times. Each iteration: shift result left, OR in the LSB of val, then shift val right.",
    "answer": null,
    "ansCode": "uint8_t reverse_bits(uint8_t val) {\n    uint8_t result = 0;\n    for (int i = 0; i < 8; i++) {\n        result = (result << 1) | (val & 1);\n        val >>= 1;\n    }\n    return result;\n}"
  }
];
