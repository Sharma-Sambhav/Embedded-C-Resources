// ─────────────────────────────────────────────────────────────────
//  10 MCQs
// ─────────────────────────────────────────────────────────────────
window._quiz_Pointers = [
  {
    "q": "Given <code>uint32_t *p = (uint32_t*)0x2000</code>, what is the value of <code>p + 1</code>?",
    "opts": ["0x2001", "0x2002", "0x2004", "0x2008"],
    "ans": 2,
    "exp": "Pointer arithmetic advances by sizeof(uint32_t) = 4 bytes. 0x2000 + 4 = 0x2004."
  },
  {
    "q": "What does the <code>volatile</code> keyword do when applied to a pointer target in embedded C?",
    "opts": [
      "Makes the pointer itself read-only",
      "Prevents the compiler from caching reads/writes to that memory location",
      "Allocates the variable in flash memory",
      "Ensures the variable is 32-bit aligned"
    ],
    "ans": 1,
    "exp": "volatile tells the compiler to re-read/re-write the memory every time — it cannot cache the value in a register. Critical for hardware registers and ISR-shared variables."
  },
  {
    "q": "Which line correctly sets bit 5 and clears bit 3 of a register in a single statement?",
    "opts": [
      "<code>*REG = (1&lt;&lt;5) - (1&lt;&lt;3);</code>",
      "<code>*REG |= (1&lt;&lt;5); *REG &= ~(1&lt;&lt;3);</code>",
      "<code>*REG = (*REG | (1&lt;&lt;5)) &amp; ~(1&lt;&lt;3);</code>",
      "<code>*REG ^= (1&lt;&lt;5) | (1&lt;&lt;3);</code>"
    ],
    "ans": 2,
    "exp": "(*REG | (1<<5)) sets bit 5, then & ~(1<<3) clears bit 3 — all in one expression without a separate read. Option B uses two statements and is also correct but not 'single statement'."
  },
  {
    "q": "How do you declare a function pointer named <code>isr_fn</code> that takes no arguments and returns void?",
    "opts": [
      "<code>void isr_fn(void)*;</code>",
      "<code>void *isr_fn(void);</code>",
      "<code>void (*isr_fn)(void);</code>",
      "<code>(*void isr_fn)(void);</code>"
    ],
    "ans": 2,
    "exp": "The parentheses around *isr_fn bind the * to the name, making it a pointer. Without them, void *isr_fn(void) declares a function returning void*."
  },
  {
    "q": "A <code>uint8_t</code> loop counter <code>i</code> is used in <code>for(i=0; i&lt;256; i++)</code>. What happens?",
    "opts": [
      "Runs 256 times correctly",
      "Infinite loop — uint8_t wraps 255→0 so i<256 is always true",
      "Compiler error: 256 doesn't fit in uint8_t",
      "Runs 255 times then stops"
    ],
    "ans": 1,
    "exp": "uint8_t max is 255. When i reaches 255 and increments, it wraps to 0. The condition i<256 is always satisfied. Use uint16_t or size_t for loop bounds that reach 256."
  },
  {
    "q": "What is the correct way to read a multi-bit field at bits [5:4] from a register?",
    "opts": [
      "<code>(*REG >> 4) & 0x3</code>",
      "<code>(*REG & 0x3) >> 4</code>",
      "<code>(*REG >> 4) | 0x3</code>",
      "<code>(*REG & 0x30)</code>"
    ],
    "ans": 0,
    "exp": "Shift right to bring the field to bits [1:0], then mask with 0x3 (binary 11) to isolate exactly 2 bits. (*REG & 0x3) >> 4 masks first (wrong bits) then shifts to 0 — always 0."
  },
  {
    "q": "Which pointer declaration makes both the pointer AND the data it points to read-only?",
    "opts": [
      "<code>const uint8_t *p;</code>",
      "<code>uint8_t * const p;</code>",
      "<code>const uint8_t * const p;</code>",
      "<code>volatile const uint8_t *p;</code>"
    ],
    "ans": 2,
    "exp": "const uint8_t * const p — the first const makes the data read-only, the second const makes the pointer itself read-only. Both are fixed."
  },
  {
    "q": "In a ring buffer, how do you distinguish 'full' from 'empty' when head and tail indices are used?",
    "opts": [
      "Empty: head==tail. Full: head==tail+1 (mod SIZE)",
      "Empty: head==0. Full: tail==SIZE-1",
      "Empty: head==tail. Full: (head+1)%SIZE == tail",
      "Empty: tail==0. Full: head==SIZE"
    ],
    "ans": 2,
    "exp": "The classic one-slot-sacrifice approach: empty when head==tail, full when advancing head by 1 would equal tail. This sacrifices one slot to avoid ambiguity."
  },
  {
    "q": "On Cortex-M, which of these causes a HardFault on Cortex-M0 but not M3/M4?",
    "opts": [
      "Writing 1 to a read-only bit",
      "Dereferencing a uint32_t* pointing to an odd address",
      "Reading a volatile register twice in one expression",
      "Using ptrdiff_t for pointer subtraction"
    ],
    "ans": 1,
    "exp": "Cortex-M0 requires natural alignment — uint32_t must be at a 4-byte-aligned address. M3/M4 support unaligned access in hardware. Dereferencing a misaligned pointer on M0 causes a HardFault."
  },
  {
    "q": "What does <code>*REG &= ~(0xF &lt;&lt; 4)</code> do?",
    "opts": [
      "Sets bits [7:4] to 0xF",
      "Clears bits [7:4] to 0",
      "Toggles bits [7:4]",
      "Sets bits [3:0] to 0"
    ],
    "ans": 1,
    "exp": "0xF<<4 = 0b11110000. ~(0xF<<4) inverts to 0b...00001111. ANDing clears bits [7:4] to 0 without touching any other bits — standard field-clear before a write."
  }
];

// ─────────────────────────────────────────────────────────────────
//  70 Exercises  (drills, traces, debugs, tasks)
// ─────────────────────────────────────────────────────────────────
window._ex_Pointers = [

  // ── PHASE 1: Raw Pointer Reflexes ──────────────────────────────

  {
    "title": "Declare and initialise a pointer to NULL",
    "diff": "easy",
    "desc": "Write one line: declare a <code>uint8_t*</code> named <code>ptr</code> and set it to <code>NULL</code>.",
    "hint": "NULL is the safe 'points nowhere' value for any pointer.",
    "answer": null,
    "ansCode": "uint8_t *ptr = NULL;"
  },
  {
    "title": "Take the address of a variable",
    "diff": "easy",
    "desc": "Given <code>uint16_t x = 42;</code> — write one line to create a pointer <code>p</code> that points to <code>x</code>.",
    "hint": "The & operator yields the address of its operand.",
    "answer": null,
    "ansCode": "uint16_t *p = &x;"
  },
  {
    "title": "Dereference: read through a pointer",
    "diff": "easy",
    "desc": "Given:\n<code>uint8_t x = 99;\nuint8_t *p = &x;</code>\nWrite one line to copy the value of <code>x</code> into a new variable <code>val</code> using only <code>p</code>.",
    "hint": "Unary * reads the value at the address stored in p.",
    "answer": null,
    "ansCode": "uint8_t val = *p;"
  },
  {
    "title": "Dereference: write through a pointer",
    "diff": "easy",
    "desc": "Given:\n<code>uint32_t x = 10;\nuint32_t *p = &x;</code>\nWrite one line to change <code>x</code> to 20 using only <code>p</code>. Do NOT write to <code>x</code> directly.",
    "hint": "Dereferencing on the left side of = writes through the pointer.",
    "answer": null,
    "ansCode": "*p = 20;"
  },
  {
    "title": "Pointer to first element of array",
    "diff": "easy",
    "desc": "Given <code>uint8_t buf[8] = {0};</code> — write one line to point <code>p</code> at the first element.",
    "hint": "An array name decays to a pointer to its first element.",
    "answer": null,
    "ansCode": "uint8_t *p = buf;  // equivalent to &buf[0]"
  },
  {
    "title": "Pointer increment by 1 element",
    "diff": "easy",
    "desc": "Given:\n<code>uint32_t arr[4] = {1,2,3,4};\nuint32_t *p = arr;</code>\nWrite one line to advance <code>p</code> by one <code>uint32_t</code>.",
    "hint": "p++ advances by sizeof(uint32_t) = 4 bytes, not 1 byte.",
    "answer": null,
    "ansCode": "p++;"
  },
  {
    "title": "Pointer advance by N elements",
    "diff": "easy",
    "desc": "Given:\n<code>uint8_t arr[8];\nuint8_t *p = arr;</code>\nWrite one line to move <code>p</code> so it points at <code>arr[3]</code>.",
    "hint": "Use += with the element count, not byte count.",
    "answer": null,
    "ansCode": "p += 3;"
  },
  {
    "title": "Read element via pointer arithmetic (no subscript)",
    "diff": "easy",
    "desc": "Given:\n<code>uint8_t arr[8] = {0,1,2,3,4,55,6,7};\nuint8_t *p = arr;</code>\nWrite one expression to read <code>arr[5]</code> using <code>*(p + N)</code> syntax.",
    "hint": "*(p+5) and arr[5] compile to the same instruction.",
    "answer": null,
    "ansCode": "uint8_t v = *(p + 5);"
  },
  {
    "title": "Trace: pointer write sequence",
    "diff": "easy",
    "desc": "What is the value of <code>x</code> after this code runs?\n<code>uint32_t x = 5;\nuint32_t *p = &x;\n*p = 100;\n*p += 1;</code>",
    "hint": "*p = 100 sets x. *p += 1 increments x through p.",
    "answer": "x == 101",
    "ansCode": null
  },
  {
    "title": "Trace: array pointer walk",
    "diff": "easy",
    "desc": "What are the values of <code>a</code>, <code>b</code>, <code>c</code>?\n<code>uint8_t arr[] = {10,20,30,40};\nuint8_t *p = arr;\nuint8_t a = *p;\np += 2;\nuint8_t b = *p;\nuint8_t c = *(p - 1);</code>",
    "hint": "p starts at arr[0]. After p+=2 it is at arr[2].",
    "answer": "a=10, b=30, c=20",
    "ansCode": null
  },
  {
    "title": "Pointer subtraction (element count)",
    "diff": "medium",
    "desc": "Given:\n<code>uint16_t buf[8];\nuint16_t *start = &buf[1];\nuint16_t *end   = &buf[6];</code>\nWrite one line to store the number of elements between them in <code>ptrdiff_t count</code>.",
    "hint": "Subtracting two same-type pointers gives element count, not bytes.",
    "answer": null,
    "ansCode": "ptrdiff_t count = end - start;"
  },
  {
    "title": "Pointer to const vs const pointer",
    "diff": "medium",
    "desc": "Given <code>uint8_t x = 7;</code> — write two lines:\n1. A pointer where the data cannot be changed through it.\n2. A pointer that cannot be pointed elsewhere after init.",
    "hint": "const before * = read-only data. const after * = fixed pointer.",
    "answer": null,
    "ansCode": "const uint8_t *pc = &x;   // data read-only\nuint8_t * const cp = &x; // pointer fixed"
  },
  {
    "title": "Trace: pointer arithmetic with uint32_t",
    "diff": "medium",
    "desc": "Assume <code>arr</code> is at address <code>0x2000</code>. What address does <code>p</code> hold after the increments?\n<code>uint32_t arr[4];\nuint32_t *p = arr;\np++;\np++;</code>",
    "hint": "Each uint32_t is 4 bytes wide.",
    "answer": "0x2008 (offset +8 bytes from start)",
    "ansCode": null
  },
  {
    "title": "Cast void* to uint8_t*",
    "diff": "medium",
    "desc": "Complete the function body: cast the <code>void*</code> parameter to <code>uint8_t*</code> named <code>buf</code>.\n<code>void process(void *data, uint16_t len) {\n  // TODO\n}</code>",
    "hint": "void* cannot be dereferenced directly — cast it explicitly.",
    "answer": null,
    "ansCode": "uint8_t *buf = (uint8_t*)data;"
  },
  {
    "title": "Double pointer: advance caller's pointer",
    "diff": "hard",
    "desc": "Using only <code>pp</code>, write one line to advance <code>tx_ptr</code> forward by one element.\n<code>uint8_t tx_buf[64];\nuint8_t *tx_ptr = tx_buf;\nuint8_t **pp = &tx_ptr;</code>",
    "hint": "Dereferencing pp gives tx_ptr itself (not what tx_ptr points at).",
    "answer": null,
    "ansCode": "(*pp)++;"
  },

  // ── PHASE 2: Register Access ────────────────────────────────────

  {
    "title": "Create a volatile register pointer",
    "diff": "easy",
    "desc": "Write one line to create a <code>volatile uint32_t*</code> named <code>RCC_CR</code> pointing to address <code>0x40023800</code>.",
    "hint": "Cast the integer literal to the pointer type with volatile.",
    "answer": null,
    "ansCode": "volatile uint32_t *RCC_CR = (volatile uint32_t*)0x40023800;"
  },
  {
    "title": "Set a single bit",
    "diff": "easy",
    "desc": "Set bit 5 of <code>*GPIOA_ODR</code> without changing any other bit.\n<code>volatile uint32_t *GPIOA_ODR = (volatile uint32_t*)0x40020014;</code>",
    "hint": "OR with a mask that has only bit 5 set. Use 1U to avoid signed-shift UB.",
    "answer": null,
    "ansCode": "*GPIOA_ODR |= (1U << 5);"
  },
  {
    "title": "Clear a single bit",
    "diff": "easy",
    "desc": "Clear bit 3 of the register without touching other bits.\n<code>volatile uint32_t *PERIPH_CR = (volatile uint32_t*)0x40013800;</code>",
    "hint": "~(1U<<3) produces all-ones except bit 3. AND that in.",
    "answer": null,
    "ansCode": "*PERIPH_CR &= ~(1U << 3);"
  },
  {
    "title": "Toggle a bit",
    "diff": "easy",
    "desc": "Toggle bit 7 of the LED register (flip 0→1 or 1→0).\n<code>volatile uint32_t *LED_REG = (volatile uint32_t*)0x40020018;</code>",
    "hint": "XOR with 1 flips, XOR with 0 leaves unchanged.",
    "answer": null,
    "ansCode": "*LED_REG ^= (1U << 7);"
  },
  {
    "title": "Test (read) a single bit",
    "diff": "easy",
    "desc": "Write an <code>if</code> that executes its body only when bit 2 of <code>*USART_SR</code> is set.\n<code>volatile uint32_t *USART_SR = (volatile uint32_t*)0x40011000;</code>",
    "hint": "AND isolates the bit — non-zero means it's set.",
    "answer": null,
    "ansCode": "if (*USART_SR & (1U << 2)) { /* bit 2 set */ }"
  },
  {
    "title": "Polling loop on a status bit",
    "diff": "easy",
    "desc": "Write a while loop that busy-waits until bit 6 of the SPI status register becomes 1.\n<code>volatile uint32_t *SPI_SR = (volatile uint32_t*)0x40013008;</code>",
    "hint": "Loop condition is true while the bit is NOT set.",
    "answer": null,
    "ansCode": "while (!(*SPI_SR & (1U << 6)));"
  },
  {
    "title": "Trace: register bit operations",
    "diff": "easy",
    "desc": "Starting from 0, trace the register value after each line:\n<code>volatile uint32_t *REG = (volatile uint32_t*)0x40020000;\n*REG  = 0;\n*REG |= (1U << 0);\n*REG |= (1U << 4);\n*REG |= (1U << 8);</code>",
    "hint": "Each |= adds one bit to the running total.",
    "answer": "Bits 0, 4, 8 set. Final value = 0x00000111 (decimal 273).",
    "ansCode": null
  },
  {
    "title": "Write a multi-bit field",
    "diff": "medium",
    "desc": "Bits [5:4] select the prescaler. Write them to value <code>0b10</code> without changing other bits.\n<code>volatile uint32_t *CR = (volatile uint32_t*)0x40021000;\n#define PSC_SHIFT 4\n#define PSC_MASK  (0x3U << PSC_SHIFT)</code>",
    "hint": "Clear the field first with &~MASK, then OR in the new value.",
    "answer": null,
    "ansCode": "*CR = (*CR & ~PSC_MASK) | (2U << PSC_SHIFT);"
  },
  {
    "title": "Enable peripheral clock via RCC",
    "diff": "medium",
    "desc": "Write two lines: (1) create a volatile pointer to RCC_AHB1ENR at <code>0x40023830</code>; (2) enable GPIOA clock by setting bit 0.",
    "hint": "Bit 0 of AHB1ENR is the GPIOA clock gate on STM32F4.",
    "answer": null,
    "ansCode": "volatile uint32_t *RCC_AHB1ENR = (volatile uint32_t*)0x40023830;\n*RCC_AHB1ENR |= (1U << 0);"
  },
  {
    "title": "Configure GPIO pin as output (MODER)",
    "diff": "medium",
    "desc": "On STM32, GPIOA_MODER bits [11:10] control pin 5 mode. Write them to <code>0b01</code> (output) without disturbing other bits.\n<code>volatile uint32_t *GPIOA_MODER = (volatile uint32_t*)0x40020000;</code>",
    "hint": "2 bits per pin. Pin 5 occupies bits [11:10]. Clear then set.",
    "answer": null,
    "ansCode": "*GPIOA_MODER = (*GPIOA_MODER & ~(0x3U << 10)) | (0x1U << 10);"
  },
  {
    "title": "Debug: missing volatile causes frozen loop",
    "diff": "medium",
    "desc": "This loop freezes in Release (-O2) but works in Debug (-O0). Fix it.\n<code>uint32_t *STATUS = (uint32_t*)0x40020000;\nwhile ((*STATUS & 0x01) == 0) { }</code>",
    "hint": "The compiler is allowed to read *STATUS once and cache it since it has no reason to believe it changes.",
    "answer": "Add volatile: volatile uint32_t *STATUS = (volatile uint32_t*)0x40020000;",
    "ansCode": null
  },
  {
    "title": "Trace: read-modify-write sequence",
    "diff": "medium",
    "desc": "Starting from <code>reg = 0xFF</code>, what is reg after these three lines?\n<code>reg &= ~(0xF << 4);  // clear bits [7:4]\nreg |=  (0xA << 4);  // write 0xA to bits [7:4]\nreg ^=  (1   << 0);  // toggle bit 0</code>",
    "hint": "Work step by step: 0xFF → clear upper nibble → set to 0xA → toggle bit 0.",
    "answer": "0xAE",
    "ansCode": null
  },
  {
    "title": "Bit-band alias: atomic bit set",
    "diff": "hard",
    "desc": "On Cortex-M3/M4 the bit-band alias for peripheral bit b at word address A is:\n<code>alias = 0x42000000 + ((A - 0x40000000)*32) + (b*4)</code>\nWrite a macro and a line to atomically set bit 5 of register at <code>0x40020014</code> using its alias.",
    "hint": "Write 1U to the computed alias address cast to volatile uint32_t*.",
    "answer": null,
    "ansCode": "#define BB(addr,bit) ((volatile uint32_t*)(0x42000000+((addr-0x40000000)*32)+((bit)*4)))\n*BB(0x40020014, 5) = 1U;"
  },
  {
    "title": "NVIC enable IRQ bare-metal",
    "diff": "hard",
    "desc": "Enable IRQ number 37 and set its priority to 3 with no HAL.\nNVIC_ISER base: <code>0xE000E100</code>. NVIC_IPR base: <code>0xE000E400</code>.",
    "hint": "NVIC_ISER is an array of 32-bit words — each bit controls one IRQ. IPR is a byte array.",
    "answer": null,
    "ansCode": "volatile uint32_t *NVIC_ISER = (volatile uint32_t*)0xE000E100;\nvolatile uint8_t  *NVIC_IPR  = (volatile uint8_t* )0xE000E400;\nNVIC_ISER[37/32] |= (1U << (37 % 32));\nNVIC_IPR[37] = (3 << 4);"
  },
  {
    "title": "Peripheral register struct map",
    "diff": "hard",
    "desc": "Define a packed struct mapping three 32-bit UART registers at offsets 0 (CR1), 4 (CR2), 8 (SR). Then create a pointer to it at base address <code>0x40011000</code>.",
    "hint": "Fields must be volatile. Use __attribute__((packed)) or pragma pack.",
    "answer": null,
    "ansCode": "typedef struct {\n  volatile uint32_t CR1;\n  volatile uint32_t CR2;\n  volatile uint32_t SR;\n} UART_t;\nUART_t * const UART1 = (UART_t*)0x40011000;"
  },

  // ── PHASE 3: Firmware Patterns ──────────────────────────────────

  {
    "title": "Declare a function pointer",
    "diff": "easy",
    "desc": "Write one line declaring a function pointer named <code>handler</code> that takes a <code>uint8_t</code> and returns <code>void</code>.",
    "hint": "Parentheses around *handler are mandatory.",
    "answer": null,
    "ansCode": "void (*handler)(uint8_t);"
  },
  {
    "title": "Assign and call a function pointer",
    "diff": "easy",
    "desc": "Assign <code>handler</code> to <code>process_byte</code> then call it with <code>0xAB</code>.\n<code>void process_byte(uint8_t b) { /* ... */ }\nvoid (*handler)(uint8_t);</code>",
    "hint": "A function name without () decays to a function pointer.",
    "answer": null,
    "ansCode": "handler = process_byte;\nhandler(0xAB);"
  },
  {
    "title": "Function pointer dispatch table",
    "diff": "easy",
    "desc": "Declare an array of 4 function pointers (each takes <code>uint8_t</code>, returns <code>void</code>) named <code>cmd_table</code>. Call the entry at index 2 with <code>0xFF</code>.\n<code>void cmd0(uint8_t b); void cmd1(uint8_t b);\nvoid cmd2(uint8_t b); void cmd3(uint8_t b);</code>",
    "hint": "Array of function pointer type: void (*name[N])(uint8_t).",
    "answer": null,
    "ansCode": "void (*cmd_table[4])(uint8_t) = {cmd0, cmd1, cmd2, cmd3};\ncmd_table[2](0xFF);"
  },
  {
    "title": "typedef a callback type",
    "diff": "easy",
    "desc": "Use typedef to create a type <code>DataCallback</code> for a function that takes <code>uint8_t*</code> and <code>uint16_t</code> and returns <code>void</code>.",
    "hint": "typedef void (*TypeName)(params);",
    "answer": null,
    "ansCode": "typedef void (*DataCallback)(uint8_t *data, uint16_t len);"
  },
  {
    "title": "Ring buffer push",
    "diff": "medium",
    "desc": "Complete <code>rb_push</code>: write <code>byte</code> at head, advance head (mod SIZE), return -1 if full.\n<code>#define RB_SIZE 16\ntypedef struct { uint8_t buf[RB_SIZE]; uint8_t head, tail; } RingBuf;\nint rb_push(RingBuf *rb, uint8_t byte) {\n  // TODO\n}</code>",
    "hint": "Full when (head+1)%SIZE == tail. Write at current head then advance.",
    "answer": null,
    "ansCode": "  if (((rb->head + 1) % RB_SIZE) == rb->tail) return -1;\n  rb->buf[rb->head] = byte;\n  rb->head = (rb->head + 1) % RB_SIZE;\n  return 0;"
  },
  {
    "title": "Ring buffer pop",
    "diff": "medium",
    "desc": "Complete <code>rb_pop</code>: read from tail, advance tail, return -1 if empty.\n<code>#define RB_SIZE 16\ntypedef struct { uint8_t buf[RB_SIZE]; uint8_t head, tail; } RingBuf;\nint rb_pop(RingBuf *rb, uint8_t *out) {\n  // TODO\n}</code>",
    "hint": "Empty when head == tail.",
    "answer": null,
    "ansCode": "  if (rb->head == rb->tail) return -1;\n  *out = rb->buf[rb->tail];\n  rb->tail = (rb->tail + 1) % RB_SIZE;\n  return 0;"
  },
  {
    "title": "ISR with ring buffer push",
    "diff": "medium",
    "desc": "Write a UART RX ISR that reads one byte from DR and pushes it to the ring buffer.\n<code>extern RingBuf rx_buf;\nvolatile uint8_t *USART_DR = (volatile uint8_t*)0x40011004;</code>",
    "hint": "ISR signature on Cortex-M (GCC): void __attribute__((interrupt)) NAME(void).",
    "answer": null,
    "ansCode": "void __attribute__((interrupt)) USART1_IRQHandler(void) {\n  uint8_t byte = *USART_DR;\n  rb_push(&rx_buf, byte);\n}"
  },
  {
    "title": "Trace: state machine byte feed",
    "diff": "medium",
    "desc": "Trace the state after feeding bytes <code>0x02, 0xAA, 0x03</code> one at a time.\n<code>typedef enum { IDLE, DATA, END } State;\nState s = IDLE;\nvoid feed(uint8_t b) {\n  switch(s) {\n    case IDLE: if (b==0x02) s=DATA; break;\n    case DATA: if (b==0x03) s=END;  break;\n    case END:  s=IDLE; break;\n  }\n}</code>",
    "hint": "Trace feed() for each byte in sequence.",
    "answer": "0x02→DATA, 0xAA→DATA (no change), 0x03→END",
    "ansCode": null
  },
  {
    "title": "DMA-style transform copy with callback",
    "diff": "hard",
    "desc": "Write <code>stream_copy</code>: copy <code>len</code> bytes from <code>src</code> to <code>dst</code>, applying <code>xform</code> to each byte. If <code>xform</code> is NULL, copy unchanged.\n<code>typedef uint8_t (*TransformFn)(uint8_t);</code>",
    "hint": "Guard against NULL before calling through the pointer.",
    "answer": null,
    "ansCode": "void stream_copy(const uint8_t *src, uint8_t *dst,\n                 uint16_t len, TransformFn xform) {\n  for (uint16_t i = 0; i < len; i++)\n    dst[i] = xform ? xform(src[i]) : src[i];\n}"
  },
  {
    "title": "Struct register map: clock + GPIO config",
    "diff": "hard",
    "desc": "Using the struct map below, write two lines: enable GPIOA clock (RCC AHB1ENR bit 0) and configure GPIOA pin 5 as output (MODER bits [11:10] = 0b01).\n<code>typedef struct { volatile uint32_t MODER; volatile uint32_t OTYPER;\n  volatile uint32_t OSPEEDR; volatile uint32_t PUPDR;\n  volatile uint32_t IDR;     volatile uint32_t ODR; } GPIO_t;\ntypedef struct { uint32_t _r[12]; volatile uint32_t AHB1ENR; } RCC_t;\nGPIO_t *const GPIOA = (GPIO_t*)0x40020000;\nRCC_t  *const RCC   = (RCC_t* )0x40023800;</code>",
    "hint": "Remember to clear MODER bits first before ORing in new value.",
    "answer": null,
    "ansCode": "RCC->AHB1ENR  |= (1U << 0);\nGPIOA->MODER   = (GPIOA->MODER & ~(0x3U<<10)) | (0x1U<<10);"
  },
  {
    "title": "SysTick timer bare-metal init",
    "diff": "hard",
    "desc": "Write the three register writes (no HAL/CMSIS) to configure SysTick for a 1 ms tick at 72 MHz:\n- SYST_RVR at 0xE000E014 = reload value\n- SYST_CVR at 0xE000E018 = clear current value\n- SYST_CSR at 0xE000E010 = enable + tick interrupt + use processor clock",
    "hint": "1 ms at 72 MHz = 72000 - 1 ticks. CSR bits: 0=ENABLE, 1=TICKINT, 2=CLKSOURCE.",
    "answer": null,
    "ansCode": "volatile uint32_t *SYST_RVR = (volatile uint32_t*)0xE000E014;\nvolatile uint32_t *SYST_CVR = (volatile uint32_t*)0xE000E018;\nvolatile uint32_t *SYST_CSR = (volatile uint32_t*)0xE000E010;\n*SYST_RVR = 72000 - 1;\n*SYST_CVR = 0;\n*SYST_CSR = (1U<<0)|(1U<<1)|(1U<<2);"
  },
  {
    "title": "Callback registration pattern",
    "diff": "medium",
    "desc": "Write a module with:\n1. A static function pointer <code>on_rx</code> of type <code>DataCallback</code>.\n2. A registration function <code>uart_set_callback(DataCallback cb)</code> that stores cb.\n3. An internal call site that invokes the callback if non-NULL.",
    "hint": "Static module-scope pointer + NULL guard before calling.",
    "answer": null,
    "ansCode": "typedef void (*DataCallback)(uint8_t*, uint16_t);\nstatic DataCallback on_rx = NULL;\nvoid uart_set_callback(DataCallback cb) { on_rx = cb; }\n// call site inside ISR:\nif (on_rx) on_rx(buf, len);"
  },
  {
    "title": "Trace: double pointer modification",
    "diff": "hard",
    "desc": "What is the value of <code>*ptr</code> after this code?\n<code>uint8_t arr[] = {10,20,30};\nuint8_t *ptr  = arr;\nuint8_t **pp  = &ptr;\n(*pp)++;\n(*pp)++;</code>",
    "hint": "(*pp)++ advances ptr, not the value ptr points at.",
    "answer": "*ptr == 30  (ptr now points at arr[2])",
    "ansCode": null
  },
  {
    "title": "ISR flag clear and ring buffer",
    "diff": "hard",
    "desc": "The USART RXNE flag (bit 5 of SR) must be cleared after reading. Write a complete ISR that reads DR to get the byte (which auto-clears RXNE on STM32), pushes to ring buffer, and as a fallback also explicitly clears bit 5 of SR.\n<code>volatile uint32_t *USART_SR = (volatile uint32_t*)0x40011000;\nvolatile uint8_t  *USART_DR = (volatile uint8_t* )0x40011004;\nextern RingBuf rx_buf;</code>",
    "hint": "On STM32, reading DR clears RXNE automatically. The explicit clear is belt-and-suspenders.",
    "answer": null,
    "ansCode": "void USART1_IRQHandler(void) {\n  if (*USART_SR & (1U << 5)) {\n    uint8_t b = *USART_DR;  // reading DR clears RXNE\n    rb_push(&rx_buf, b);\n    *USART_SR &= ~(1U << 5); // explicit clear (redundant on STM32, safe habit)\n  }\n}"
  },
  {
    "title": "Write N and its complement to adjacent registers",
    "diff": "medium",
    "desc": "Some peripherals have a SET register and a CLEAR register at consecutive addresses. Write one value <code>0x00000020</code> to the SET register and its bitwise complement to the CLEAR register.\n<code>volatile uint32_t *GPIO_BSRR = (volatile uint32_t*)0x40020018;</code>",
    "hint": "SET is the lower 16 bits; CLEAR is the upper 16 bits of BSRR on STM32. Pack both into one 32-bit write.",
    "answer": null,
    "ansCode": "// STM32 BSRR: bits[15:0]=SET, bits[31:16]=CLEAR\n// To set bit 5: write (1U<<5) to lower half, 0 to upper\n*GPIO_BSRR = (1U << 5);\n// To clear bit 5: write (1U<<(5+16)) — upper half\n*GPIO_BSRR = (1U << (5 + 16));"
  },

  // ── PHASE 4: Bug Hunting ────────────────────────────────────────

  {
    "title": "Bug: uninitialised pointer dereference",
    "diff": "easy",
    "desc": "This code crashes. Identify the bug and write the corrected version.\n<code>uint8_t *p;\n*p = 5;</code>",
    "hint": "What does p contain before it is assigned?",
    "answer": "p is declared but never initialised — it holds a garbage address. Dereferencing it is undefined behaviour (hard fault).",
    "ansCode": "uint8_t val;\nuint8_t *p = &val;\n*p = 5;"
  },
  {
    "title": "Bug: off-by-one in pointer loop",
    "diff": "easy",
    "desc": "This is supposed to zero all 8 bytes of buf, but the last byte is never cleared. Fix it.\n<code>uint8_t buf[8];\nuint8_t *p = buf;\nwhile (p < buf + 7) { *p++ = 0; }</code>",
    "hint": "buf + 7 is the address of the last byte, not one past it.",
    "answer": "Change buf + 7 to buf + 8 (one-past-end sentinel).",
    "ansCode": "while (p < buf + 8) { *p++ = 0; }"
  },
  {
    "title": "Bug: dangling pointer to stack variable",
    "diff": "easy",
    "desc": "The caller uses the returned pointer after the function returns. What is wrong?\n<code>uint8_t *get_buf(void) {\n  uint8_t local[16];\n  return local;\n}</code>",
    "hint": "Where does 'local' live in memory?",
    "answer": "local[] is stack-allocated. It is destroyed on return. The pointer dangling to freed stack memory is undefined behaviour.",
    "ansCode": "// Fix 1: static storage\nstatic uint8_t local[16];\nreturn local;\n// Fix 2: caller provides the buffer\nvoid fill_buf(uint8_t *buf, uint16_t len) { ... }"
  },
  {
    "title": "Bug: uint8_t overflow in loop bound",
    "diff": "easy",
    "desc": "This loop is supposed to zero 256 bytes but hangs forever. Fix it.\n<code>uint8_t buf[256];\nuint8_t i;\nfor (i = 0; i < 256; i++) { buf[i] = 0; }</code>",
    "hint": "What happens when a uint8_t reaches 255 and increments?",
    "answer": "uint8_t wraps 255→0. i<256 is always true → infinite loop. Change i to uint16_t or size_t.",
    "ansCode": "uint16_t i;\nfor (i = 0; i < 256; i++) { buf[i] = 0; }"
  },
  {
    "title": "Bug: wrong pointer type skips wrong number of bytes",
    "diff": "medium",
    "desc": "The intent is to skip a 4-byte header and point at the payload. But only 1 byte is skipped. Fix it.\n<code>uint8_t *p = packet_start;\np += 1;  // meant to skip 4-byte header</code>",
    "hint": "uint8_t* arithmetic advances 1 byte per step.",
    "answer": "Change p += 1 to p += 4 to skip four bytes.",
    "ansCode": "p += 4;"
  },
  {
    "title": "Bug: unaligned uint32_t access on Cortex-M0",
    "diff": "medium",
    "desc": "This crashes on Cortex-M0 with a HardFault. Fix without changing buf.\n<code>uint8_t buf[8];\nuint32_t val = *(uint32_t*)&buf[1];</code>",
    "hint": "Cortex-M0 requires natural alignment for multi-byte reads. Use memcpy.",
    "answer": "Cast dereferencing a misaligned address is UB on M0. Use memcpy — the compiler will optimise it.",
    "ansCode": "uint32_t val;\nmemcpy(&val, &buf[1], sizeof(val));"
  },
  {
    "title": "Bug: ISR re-enters immediately (flag not cleared)",
    "diff": "medium",
    "desc": "This ISR triggers once and then starves the CPU by re-entering continuously. What is the typical root cause and fix?\n<code>void TIM3_IRQHandler(void) {\n  do_work();\n  // missing something?\n}</code>",
    "hint": "Hardware holds the IRQ line asserted until the firmware acknowledges it.",
    "answer": "The timer interrupt flag (UIF, bit 0 of SR) must be cleared inside the ISR, otherwise the hardware immediately re-asserts the interrupt on exit.",
    "ansCode": "volatile uint32_t *TIM3_SR = (volatile uint32_t*)0x40000410;\nvoid TIM3_IRQHandler(void) {\n  *TIM3_SR &= ~(1U << 0);  // clear UIF flag first\n  do_work();\n}"
  },
  {
    "title": "Bug: race condition on shared variable without volatile",
    "diff": "medium",
    "desc": "The main loop never sees the ISR's update to <code>flag</code>. Fix it.\n<code>uint8_t flag = 0;\nvoid TIM2_IRQHandler(void) { flag = 1; }\nvoid main(void) { while (!flag) { } }</code>",
    "hint": "The compiler caches flag in a register since it sees no C code changing it.",
    "answer": "Add volatile: volatile uint8_t flag = 0; — forces a memory re-read every loop iteration.",
    "ansCode": "volatile uint8_t flag = 0;"
  },
  {
    "title": "Bug: stack overflow from recursion",
    "diff": "hard",
    "desc": "This recursive CRC crashes for packets > 64 bytes on target (1 KB stack). Fix it iteratively.\n<code>uint8_t crc8(const uint8_t *d, uint16_t len) {\n  if (len == 0) return 0;\n  return crc_table[*d ^ crc8(d+1, len-1)];\n}</code>",
    "hint": "Each call frame consumes stack. 64+ frames exhausts typical embedded stacks.",
    "answer": "Rewrite iteratively — O(1) stack usage.",
    "ansCode": "uint8_t crc8(const uint8_t *d, uint16_t len) {\n  uint8_t crc = 0;\n  while (len--) crc = crc_table[*d++ ^ crc];\n  return crc;\n}"
  },
  {
    "title": "Bug: signed/unsigned comparison warning becomes bug",
    "diff": "medium",
    "desc": "This function is supposed to validate that index is within bounds. But it always passes for large indices. Why? Fix it.\n<code>int validate(uint16_t index, int limit) {\n  if (index < limit) return 1;\n  return 0;\n}</code>",
    "hint": "When limit is negative, what happens when it's compared to an unsigned value?",
    "answer": "When limit is negative (e.g. -1), it is converted to a large uint16_t value in the comparison, making index always appear less than it. Use consistent unsigned types.",
    "ansCode": "int validate(uint16_t index, uint16_t limit) {\n  return (index < limit) ? 1 : 0;\n}"
  },
  {
    "title": "Debug: find the off-by-one in memset loop",
    "diff": "medium",
    "desc": "This is supposed to fill a 10-byte array with 0xFF. Spot the bug.\n<code>uint8_t buf[10];\nfor (int i = 1; i <= 10; i++) { buf[i] = 0xFF; }</code>",
    "hint": "Valid indices for buf[10] are 0 through 9.",
    "answer": "Two bugs: starts at index 1 (misses buf[0]) and accesses buf[10] (one past end — undefined behaviour). Fix: i=0; i<10.",
    "ansCode": "for (int i = 0; i < 10; i++) { buf[i] = 0xFF; }"
  },
  {
    "title": "Debug: wrong cast loses upper bytes",
    "diff": "medium",
    "desc": "Assembling a 16-bit value from two bytes produces a wrong result. Fix the cast.\n<code>uint8_t hi = 0x12, lo = 0x34;\nuint16_t val = (hi << 8) | lo;</code>",
    "hint": "hi is uint8_t. What type does (hi << 8) produce and what happens to the upper bits?",
    "answer": "On platforms where int is 16-bit, hi<<8 shifts a uint8_t by 8 — which is implementation-defined. Cast hi to uint16_t first to guarantee correctness.",
    "ansCode": "uint16_t val = ((uint16_t)hi << 8) | lo;"
  },
  {
    "title": "Debug: interrupt fires but no handler defined",
    "diff": "hard",
    "desc": "An unexpected interrupt causes the CPU to jump to the default handler and hang. The developer enabled TIM3 update interrupt in NVIC but forgot one thing. What is it?\n<code>// NVIC enable done, TIM3 UIE bit set in DIER...\n// ...but no TIM3_IRQHandler defined in firmware</code>",
    "hint": "What does the vector table contain for an unimplemented IRQ?",
    "answer": "The vector table entry for TIM3_IRQ points to the default/weak handler (infinite loop). The developer must define void TIM3_IRQHandler(void) to override the weak symbol.",
    "ansCode": "void TIM3_IRQHandler(void) {\n  volatile uint32_t *TIM3_SR = (volatile uint32_t*)0x40000410;\n  *TIM3_SR &= ~(1U << 0); // clear UIF\n  // handle event\n}"
  },
  {
    "title": "Debug: pointer incremented inside condition",
    "diff": "hard",
    "desc": "This parser is supposed to read pairs of bytes from a stream. Why does it skip every other pair, and how do you fix it?\n<code>uint8_t *p = stream;\nwhile (p < end) {\n  uint8_t cmd  = *p++;\n  uint8_t data = *p++;\n  process(cmd, data);\n  p += 2;  // advance past this pair\n}</code>",
    "hint": "Count how many bytes p advances per iteration.",
    "answer": "p advances by 4 (two increments from *p++, plus p+=2 at end) but each pair is only 2 bytes. Remove the extra p+=2.",
    "ansCode": "while (p < end) {\n  uint8_t cmd  = *p++;\n  uint8_t data = *p++;\n  process(cmd, data);\n  // no extra p+=2 here\n}"
  },
  {
    "title": "Debug: function pointer table not const — gets corrupted",
    "diff": "hard",
    "desc": "The dispatch table occasionally gets zeroed in production, causing null pointer calls. What is the fix?\n<code>void (*cmd_table[4])(uint8_t) = {cmd0, cmd1, cmd2, cmd3};\n// stored in RAM — a stray write zeros it</code>",
    "hint": "Where does a non-const array of function pointers live? Where should it live?",
    "answer": "A non-const initialised array is copied to RAM at startup. Place it in flash (read-only) by making it const — stray writes to flash are ignored (write-protected).",
    "ansCode": "const void (*cmd_table[4])(uint8_t) = {cmd0, cmd1, cmd2, cmd3};\n// now placed in .rodata / flash — immune to RAM corruption"
  },

  // ── EXTRA DRILLS: Mixed advanced topics ─────────────────────────

  {
    "title": "Trace: pointer comparison",
    "diff": "easy",
    "desc": "What does this print? (assume arr is at 0x2000)\n<code>uint8_t arr[4];\nuint8_t *p = arr;\nuint8_t *q = arr + 4;\nprintf(\"%d\", (int)(q - p));</code>",
    "hint": "Pointer subtraction gives element count.",
    "answer": "Prints: 4  (q - p = 4 elements of uint8_t)",
    "ansCode": null
  },
  {
    "title": "Write: toggle LED on each SysTick",
    "diff": "medium",
    "desc": "Write the SysTick handler that toggles pin 5 of GPIOA each time it fires.\n<code>volatile uint32_t *GPIOA_ODR = (volatile uint32_t*)0x40020014;</code>",
    "hint": "Toggle with XOR. No loop needed — the handler is called by hardware on each tick.",
    "answer": null,
    "ansCode": "void SysTick_Handler(void) {\n  *GPIOA_ODR ^= (1U << 5);\n}"
  },
  {
    "title": "Write: software delay loop",
    "diff": "easy",
    "desc": "Write a blocking delay function that loops <code>n</code> times. Prevent the compiler from optimising it away.",
    "hint": "Use volatile for the counter or use a volatile dummy write.",
    "answer": null,
    "ansCode": "void delay(volatile uint32_t n) {\n  while (n--) { }\n}"
  },
  {
    "title": "Trace: volatile vs non-volatile read count",
    "diff": "medium",
    "desc": "With -O2, how many memory reads does each version perform in the loop?\n<code>// A:\nuint32_t *reg = (uint32_t*)0x40020000;\nfor (int i=0; i<100; i++) { if (*reg & 1) break; }\n\n// B:\nvolatile uint32_t *reg = (volatile uint32_t*)0x40020000;\nfor (int i=0; i<100; i++) { if (*reg & 1) break; }</code>",
    "hint": "The compiler may cache a non-volatile read in a register.",
    "answer": "A: 1 read (compiler caches). B: 100 reads (one per iteration — volatile prevents caching).",
    "ansCode": null
  },
  {
    "title": "Write: packed struct for I2C frame",
    "diff": "medium",
    "desc": "Define a packed struct for an I2C register frame: 1-byte address, 1-byte reg ID, 2-byte value. Packed so no padding is inserted.",
    "hint": "Use __attribute__((packed)) after the struct definition.",
    "answer": null,
    "ansCode": "typedef struct __attribute__((packed)) {\n  uint8_t  addr;\n  uint8_t  reg_id;\n  uint16_t value;\n} I2C_Frame_t;"
  },
  {
    "title": "Drill: read-only peripheral ID register",
    "diff": "easy",
    "desc": "Write one line to read the peripheral ID from address <code>0x40013FFC</code> into <code>uint32_t pid</code>. The register is read-only hardware.",
    "hint": "volatile ensures the read always happens. const* expresses read-only intent.",
    "answer": null,
    "ansCode": "uint32_t pid = *(volatile const uint32_t*)0x40013FFC;"
  },
  {
    "title": "Drill: pointer to a function returning a pointer",
    "diff": "hard",
    "desc": "Declare a function pointer named <code>alloc_fn</code> that takes a <code>uint16_t</code> size and returns a <code>void*</code>.",
    "hint": "Return type goes before (*name), parameter list goes after.",
    "answer": null,
    "ansCode": "void *(*alloc_fn)(uint16_t);"
  },
  {
    "title": "Drill: array of volatile register addresses",
    "diff": "medium",
    "desc": "Create an array of 4 volatile uint32_t pointers, each pointing to consecutive GPIO port ODR registers starting at 0x40020014 with stride 0x400.",
    "hint": "Each element is a volatile uint32_t*. Compute each address as base + n*stride.",
    "answer": null,
    "ansCode": "volatile uint32_t *odr[4] = {\n  (volatile uint32_t*)0x40020014,\n  (volatile uint32_t*)0x40020414,\n  (volatile uint32_t*)0x40020814,\n  (volatile uint32_t*)0x40020C14\n};"
  },
  {
    "title": "Trace: sizeof pointer vs sizeof array",
    "diff": "medium",
    "desc": "On a 32-bit system, what does each printf output?\n<code>uint8_t arr[16];\nuint8_t *p = arr;\nprintf(\"%zu %zu\", sizeof(arr), sizeof(p));</code>",
    "hint": "sizeof an array gives total bytes. sizeof a pointer gives pointer width.",
    "answer": "Prints: 16 4  (array = 16 bytes total; pointer = 4 bytes on 32-bit)",
    "ansCode": null
  },
  {
    "title": "Drill: endian-safe 32-bit pack from bytes",
    "diff": "hard",
    "desc": "Write one expression to pack bytes <code>b3 b2 b1 b0</code> into a uint32_t as big-endian (b3 = MSB). All bytes are uint8_t.",
    "hint": "Shift each byte to its position and OR them together. Cast to uint32_t before shifting.",
    "answer": null,
    "ansCode": "uint32_t val = ((uint32_t)b3 << 24) | ((uint32_t)b2 << 16)\n             | ((uint32_t)b1 <<  8) |  (uint32_t)b0;"
  },
  {
    "title": "Drill: pointer walk to find first zero byte",
    "diff": "medium",
    "desc": "Write a function <code>find_zero</code> that takes a <code>uint8_t*</code> and length, and returns a pointer to the first zero byte, or NULL if none found.",
    "hint": "Walk with a pointer, dereference to check, return when found.",
    "answer": null,
    "ansCode": "uint8_t *find_zero(uint8_t *p, uint16_t len) {\n  for (uint16_t i = 0; i < len; i++)\n    if (p[i] == 0) return &p[i];\n  return NULL;\n}"
  },
  {
    "title": "Drill: restrict keyword in memcpy signature",
    "diff": "hard",
    "desc": "Write the signature for a firmware-safe memcpy that tells the compiler src and dst do not overlap (enabling better optimisation).",
    "hint": "The restrict qualifier tells the compiler the pointer is the only way to access that memory in this scope.",
    "answer": null,
    "ansCode": "void fw_memcpy(void * restrict dst, const void * restrict src, uint16_t len);"
  },
  {
    "title": "Debug: memcpy overlap corrupts data",
    "diff": "hard",
    "desc": "This firmware uses memcpy to shift data inside the same buffer. Output is corrupted. What is wrong and what is the fix?\n<code>uint8_t buf[64];\nmemcpy(&buf[4], &buf[0], 60);  // shift right by 4</code>",
    "hint": "memcpy requires non-overlapping regions. What happens when src and dst overlap?",
    "answer": "memcpy has undefined behaviour for overlapping regions. Use memmove, which handles overlap correctly.",
    "ansCode": "memmove(&buf[4], &buf[0], 60);"
  },
  {
    "title": "Trace: post-increment vs pre-increment through pointer",
    "diff": "medium",
    "desc": "What are the values of <code>a</code> and <code>b</code>?\n<code>uint8_t arr[] = {5, 10, 15};\nuint8_t *p = arr;\nuint8_t a = *p++;\nuint8_t b = *++p;</code>",
    "hint": "*p++ reads then advances. *++p advances then reads.",
    "answer": "a=5 (reads arr[0], then p→arr[1]). b=15 (p advances to arr[2], then reads).",
    "ansCode": null
  },
  {
    "title": "Drill: SPI transmit byte polling",
    "diff": "medium",
    "desc": "Write a complete <code>spi_send_byte</code> function: wait until TXE (bit 1 of SR) is set, then write the byte to DR.\n<code>volatile uint32_t *SPI1_SR = (volatile uint32_t*)0x40013008;\nvolatile uint8_t  *SPI1_DR = (volatile uint8_t* )0x4001300C;</code>",
    "hint": "Poll SR bit 1 first, then write to DR.",
    "answer": null,
    "ansCode": "void spi_send_byte(uint8_t data) {\n  while (!(*SPI1_SR & (1U << 1)));  // wait TXE\n  *SPI1_DR = data;\n}"
  }
];