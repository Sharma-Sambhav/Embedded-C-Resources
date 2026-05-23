window._quiz_Structs = [
  {
    "q": "Why are peripheral register struct fields declared volatile?",
    "opts": ["To make them read-only", "Hardware can change them — prevent compiler caching", "To save RAM", "To enable DMA"],
    "ans": 1,
    "exp": "Hardware writes to registers independently of CPU code. volatile forces a real memory access every time, not a cached register value."
  },
  {
    "q": "<code>sizeof(struct { uint8_t a; uint32_t b; })</code> is:",
    "opts": ["5", "8", "4", "6"],
    "ans": 1,
    "exp": "uint32_t must be 4-byte aligned. The compiler inserts 3 padding bytes after a, making the total 8 bytes."
  },
  {
    "q": "The -> operator is equivalent to:",
    "opts": ["(*ptr).member", "&ptr.member", "ptr.member", "*ptr->member"],
    "ans": 0,
    "exp": "ptr->member is syntactic sugar for (*ptr).member — dereference the pointer then access the field."
  }
];
window._ex_Structs = [
  {
    "title": "sizeof prediction",
    "diff": "easy",
    "desc": "Predict sizeof for each struct (assume 32-bit ARM):\n\n<code>struct A { uint8_t a; uint8_t b; };\nstruct B { uint8_t a; uint32_t b; };\nstruct C { uint32_t a; uint8_t b; uint16_t c; };</code>",
    "hint": "Each member is aligned to its own size. Struct size rounds up to the largest member's alignment.",
    "answer": "sizeof(A) = 2, sizeof(B) = 8 (3-byte pad after a), sizeof(C) = 8 (1-byte pad after b to align c, then 1 pad to round to 4).",
    "ansCode": null
  },
  {
    "title": "Write a register map struct",
    "diff": "medium",
    "desc": "Define a struct for a fictional SPI peripheral with these registers at consecutive 4-byte offsets: CR1 (offset 0x00), CR2 (0x04), SR (0x08), DR (0x0C). Then define a macro <code>SPI1</code> at base address <code>0x40013000</code>.",
    "hint": "All fields should be <code>volatile uint32_t</code>. Cast the base address to a pointer to your struct.",
    "answer": null,
    "ansCode": "typedef struct {\n    volatile uint32_t CR1;\n    volatile uint32_t CR2;\n    volatile uint32_t SR;\n    volatile uint32_t DR;\n} SPI_TypeDef;\n\n#define SPI1  ((SPI_TypeDef*)0x40013000)"
  },
  {
    "title": "Challenge: reserved padding",
    "diff": "hard",
    "desc": "A peripheral has registers at offsets 0x00, 0x04, 0x10, 0x14. Offsets 0x08 and 0x0C are reserved (do not access). Model this in a struct that maps correctly without using __attribute__((packed)).",
    "hint": "Use an unnamed array member to consume the reserved bytes: <code>uint32_t _reserved[2];</code>",
    "answer": null,
    "ansCode": "typedef struct {\n    volatile uint32_t REG_A;       // 0x00\n    volatile uint32_t REG_B;       // 0x04\n    uint32_t          _res[2];     // 0x08, 0x0C — reserved\n    volatile uint32_t REG_C;       // 0x10\n    volatile uint32_t REG_D;       // 0x14\n} PERIPH_TypeDef;"
  }
];
