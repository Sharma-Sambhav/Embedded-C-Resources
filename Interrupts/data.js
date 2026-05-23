window._quiz_Interrupts = [
  {
    "q": "What happens if you forget to clear the hardware interrupt flag at the end of an ISR?",
    "opts": ["Nothing — it clears automatically", "ISR fires repeatedly — CPU stuck in interrupt", "Causes a hard fault", "The peripheral stops working"],
    "ans": 1,
    "exp": "The pending flag re-triggers the interrupt the moment the ISR returns, causing an infinite re-entry loop."
  },
  {
    "q": "A 64-bit variable is shared between an ISR and main. What do you need?",
    "opts": ["Just volatile", "Just a critical section (disable IRQ)", "Both volatile AND a critical section", "Neither — 64-bit is always atomic"],
    "ans": 2,
    "exp": "volatile prevents caching. The critical section prevents the ISR from interrupting mid-read of the two 32-bit halves."
  },
  {
    "q": "ISRs should:",
    "opts": ["Do all heavy processing to keep main() clean", "Call printf for debugging", "Run in microseconds and signal main via a flag", "Disable all other interrupts always"],
    "ans": 2,
    "exp": "Short, fast ISRs reduce latency for other interrupts. Heavy work belongs in main(), triggered by a volatile flag set in the ISR."
  }
];
window._ex_Interrupts = [
  {
    "title": "Spot the bug: missing volatile",
    "diff": "easy",
    "desc": "What is wrong with this code?\n\n<code>uint8_t data_ready = 0;\nuint8_t data = 0;\n\nvoid UART_IRQHandler(void) {\n    data = UART->DR;\n    data_ready = 1;\n}\n\nvoid loop(void) {\n    while (!data_ready) { }\n    use(data);\n}</code>",
    "hint": "What keyword is missing from the shared variables?",
    "answer": "Both <code>data_ready</code> and <code>data</code> must be <code>volatile</code>. Without it, the compiler may hoist the read of data_ready out of the while loop (it never sees a write in loop()), resulting in an infinite spin on a cached 0.",
    "ansCode": null
  },
  {
    "title": "Ring buffer between ISR and main",
    "diff": "medium",
    "desc": "Sketch a minimal ring buffer struct and the ISR/main interactions. The ISR pushes bytes; main pops them. What must be volatile? What prevents corruption on a single-core MCU?",
    "hint": "Head (written by ISR) and tail (written by main) are the shared indices. On a single-core MCU you only need to worry about the ISR interrupting main mid-update.",
    "answer": null,
    "ansCode": "#define BUF_SIZE 64\ntypedef struct {\n    volatile uint8_t  buf[BUF_SIZE];\n    volatile uint8_t  head;   // ISR writes\n    uint8_t           tail;   // main reads (only main touches)\n} RingBuf;\n\n// ISR:\nbuf.buf[buf.head++ & (BUF_SIZE-1)] = byte;\n\n// Main:\nif (buf.head != buf.tail) {\n    uint8_t b = buf.buf[buf.tail++ & (BUF_SIZE-1)];\n}"
  },
  {
    "title": "Challenge: nested interrupt priority",
    "diff": "hard",
    "desc": "You have two ISRs: UART_IRQ at priority 1 (high) and ADC_IRQ at priority 5 (low). UART_IRQ fires while ADC_IRQ is running. Walk through what the Cortex-M does step by step. What would break if both were priority 5?",
    "hint": "Cortex-M allows preemption when the new IRQ has strictly higher priority (lower number). Equal priority = no preemption.",
    "answer": "UART_IRQ (pri 1) preempts ADC_IRQ (pri 5): CPU pushes ADC_IRQ's context (8 registers) to stack, runs UART_IRQ, pops context, resumes ADC_IRQ. If both are priority 5: UART_IRQ cannot preempt — it waits in the pending state until ADC_IRQ finishes. This adds latency to UART handling, potentially losing bytes at high baud rates.",
    "ansCode": null
  }
];
