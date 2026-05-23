window._quiz_Volatile = [
  {
    "q": "A flag is set inside an ISR, read in main. What happens if you forget volatile?",
    "opts": ["Works fine — no difference", "Compiler may cache old value — main never sees the update", "Causes a hardware fault", "Generates a compiler error"],
    "ans": 1,
    "exp": "With -O2 the compiler hoists the read out of the polling loop since it never sees a write to the variable. Main loops forever on a stale cached value."
  },
  {
    "q": "volatile guarantees:",
    "opts": ["Atomic read-modify-write", "That the variable is re-read/written every access", "Thread safety", "That interrupts are disabled"],
    "ans": 1,
    "exp": "volatile only prevents the compiler from caching in a register. It says nothing about atomicity or mutual exclusion."
  },
  {
    "q": "Which of these does NOT require volatile?",
    "opts": ["A hardware status register", "A local variable inside the ISR only", "A flag shared between ISR and main", "A DMA buffer pointer"],
    "ans": 1,
    "exp": "A local variable that never leaves the ISR cannot be accessed by anything else — no caching problem, no volatile needed."
  }
];
window._ex_Volatile = [
  {
    "title": "Spot the bug",
    "diff": "easy",
    "desc": "This code is supposed to wait until a hardware BUSY flag clears. What is wrong?\n\n<code>uint32_t *STATUS = (uint32_t*)0x40020000;\nwhile (*STATUS & (1 << 7)) { }  // wait for busy</code>",
    "hint": "The compiler does not know that hardware can modify the memory at 0x40020000.",
    "answer": "Missing <code>volatile</code>. At -O2 the compiler reads STATUS once, sees the busy bit set, and emits an infinite loop. Fix: <code>volatile uint32_t *STATUS = ...</code>",
    "ansCode": null
  },
  {
    "title": "When is volatile not enough?",
    "diff": "medium",
    "desc": "You share a 64-bit timestamp between an ISR and main:\n\n<code>volatile uint64_t timestamp;</code>\n\nWhy can main still read a corrupted value even with volatile? What is the fix?",
    "hint": "A 64-bit write requires two 32-bit bus transactions on a 32-bit MCU. What can happen between them?",
    "answer": "The ISR can fire between the two 32-bit halves of the 64-bit read in main, producing a torn value (old high word, new low word). Fix: wrap the read in a critical section.",
    "ansCode": "__disable_irq();\nuint64_t snap = timestamp;\n__enable_irq();"
  },
  {
    "title": "Challenge: design the flag protocol",
    "diff": "hard",
    "desc": "An ISR fills a 16-byte packet buffer and sets a flag. Main reads the buffer when the flag is set. List every volatile declaration needed AND describe the correct order of operations in both the ISR and main to avoid reading a partially-filled buffer.",
    "hint": "Think about memory ordering: the buffer must be fully written before the flag is set. Main must clear the flag before reading, or use a snapshot.",
    "answer": "ISR: write all buffer bytes first, then set the flag last (store ordering). Main: read flag, if set copy buffer to local array, then clear flag. All shared variables (flag + buffer pointer) must be volatile. On weakly-ordered CPUs add a memory barrier before setting the flag.",
    "ansCode": "volatile uint8_t  pkt_ready = 0;\nvolatile uint8_t  pkt_buf[16];\n\nvoid ISR(void) {\n    for(int i=0;i<16;i++) pkt_buf[i] = read_hw();\n    __DMB();          // data memory barrier\n    pkt_ready = 1;\n}\n\nvoid main_loop(void) {\n    if (pkt_ready) {\n        uint8_t local[16];\n        __disable_irq();\n        memcpy(local, (void*)pkt_buf, 16);\n        pkt_ready = 0;\n        __enable_irq();\n        process(local);\n    }\n}"
  }
];
