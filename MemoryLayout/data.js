// ─────────────────────────────────────────────────────────────────
//  10 MCQs
// ─────────────────────────────────────────────────────────────────
window._quiz_MemoryLayout = [
  {
    "q": "A global <code>uint32_t x = 5;</code> lives in which section at runtime?",
    "opts": [".text (Flash)", ".bss (RAM)", ".data (RAM, initialised from Flash)", "Stack"],
    "ans": 2,
    "exp": "Initialised globals go in .data. The initialiser value is stored in Flash; startup code copies it to RAM before main()."
  },
  {
    "q": "Which section takes zero Flash space?",
    "opts": [".text", ".rodata", ".data", ".bss"],
    "ans": 3,
    "exp": ".bss is only zeroed in RAM at startup — it has no initial values to store in Flash."
  },
  {
    "q": "On a bare-metal Cortex-M, the stack pointer at reset is set by:",
    "opts": ["The first instruction in main()", "The value at address 0x00000000 (vector table entry 0)", "The linker script __stack_top symbol at link time only", "malloc()"],
    "ans": 1,
    "exp": "On reset the Cortex-M hardware loads SP from the first word of the vector table (offset 0x00)."
  },
  {
    "q": "A <code>static uint32_t count;</code> declared inside a function lives in:",
    "opts": ["Stack — but persists between calls", ".bss — RAM, zeroed at startup, persists for lifetime of program", ".data — RAM, initialised from Flash", ".text — Flash"],
    "ans": 1,
    "exp": "A zero-initialised static local has static storage duration. It lives in .bss, is zeroed once at startup, and retains its value across calls — it is NOT on the stack."
  },
  {
    "q": "The linker places <code>const uint32_t lut[256]</code> (with initialisers) in:",
    "opts": [".data", ".bss", ".rodata", "Stack"],
    "ans": 2,
    "exp": ".rodata (read-only data) holds constant initialisers. It stays in Flash — no RAM copy is made. The linker may merge .rodata into .text on some targets."
  },
  {
    "q": "What does the startup code COPY from Flash to RAM?",
    "opts": [".text section", ".bss section", ".data section initialisation image", ".rodata section"],
    "ans": 2,
    "exp": "The .data section has runtime addresses in RAM but its initial values (the load address image) live in Flash. Reset_Handler copies them byte-for-byte to RAM before main()."
  },
  {
    "q": "On Cortex-M the stack grows in which direction?",
    "opts": ["Upward — from low to high address", "Downward — from high to low address", "Both directions depending on compiler", "It doesn't move — it's fixed size"],
    "ans": 1,
    "exp": "ARM (and most architectures) use a full-descending stack. SP points to the last used word; a PUSH decrements SP first, then writes. The stack grows toward lower addresses."
  },
  {
    "q": "A heap allocation with <code>malloc(64)</code> returns memory from:",
    "opts": [".bss", ".data", "The heap — a region of RAM between .bss end and stack base", "Flash"],
    "ans": 2,
    "exp": "The heap occupies RAM between the end of .bss (called _end or __heap_start) and the bottom of the stack. malloc() manages this region. On small MCUs with no OS the heap is often avoided entirely."
  },
  {
    "q": "Which linker script symbol typically marks the boundary between .bss and the heap?",
    "opts": ["__stack_top", "_etext", "_end (or __heap_start)", "_sdata"],
    "ans": 2,
    "exp": "_end (GNU convention) is placed by the linker immediately after .bss. The C runtime's sbrk() uses it as the initial heap break. On many embedded targets you define heap size explicitly in the linker script."
  },
  {
    "q": "A function's local array <code>uint8_t buf[256];</code> with no static keyword lives on the:",
    "opts": [".bss section", ".data section", "Heap", "Stack — allocated on function entry, released on return"],
    "ans": 3,
    "exp": "Non-static locals have automatic storage duration. The compiler reserves space on the stack at function entry (SP -= 256 equivalent) and reclaims it on return. Large locals are a common cause of stack overflow in embedded systems."
  }
];

// ─────────────────────────────────────────────────────────────────
//  70 Exercises
// ─────────────────────────────────────────────────────────────────
window._ex_MemoryLayout = [

  // ── SECTION CLASSIFICATION ──────────────────────────────────────

  {
    "title": "Classify five variables into sections",
    "diff": "easy",
    "desc": "Classify each into .text, .rodata, .data, .bss, or stack:\n<code>void foo(void) { int local = 5; }  // local\nconst uint8_t lut[256] = { ... };   // lut\nuint32_t counter = 0;               // counter\nuint32_t speed = 100;               // speed\nvoid handler(void) { ... }          // handler</code>",
    "hint": "Ask: is it code? constant? initialised global? zero-init global? local?",
    "answer": "local → stack; lut → .rodata; counter → .bss; speed → .data; handler → .text.",
    "ansCode": null
  },
  {
    "title": "Classify: static local with initialiser",
    "diff": "easy",
    "desc": "Which section does each variable end up in?\n<code>static uint32_t a = 0;    // file-scope, zero-init\nstatic uint32_t b = 42;   // file-scope, nonzero\nstatic uint32_t c;         // file-scope, no init</code>",
    "hint": "Zero-init or no-init statics → .bss. Nonzero statics → .data.",
    "answer": "a → .bss (zero-initialised); b → .data (nonzero, image in Flash); c → .bss (implicitly zero).",
    "ansCode": null
  },
  {
    "title": "Classify: function-scoped static",
    "diff": "easy",
    "desc": "Where does <code>count</code> live and how long does it persist?\n<code>void tick(void) {\n  static uint32_t count = 0;\n  count++;\n}</code>",
    "hint": "static keyword gives a local variable static storage duration.",
    "answer": "count lives in .bss (zero-init). It persists for the entire program lifetime — not deallocated on return. Its value is preserved between calls.",
    "ansCode": null
  },
  {
    "title": "Trace: which section — string literal",
    "diff": "easy",
    "desc": "Where does the string <code>\"ERROR\\n\"</code> live?\n<code>void log_error(void) {\n  uart_puts(\"ERROR\\n\");\n}</code>",
    "hint": "String literals are constant data — they don't change at runtime.",
    "answer": "The string literal is placed in .rodata (Flash). The function receives a pointer to Flash. No RAM is used.",
    "ansCode": null
  },
  {
    "title": "Classify: const vs non-const global",
    "diff": "easy",
    "desc": "Classify each:\n<code>uint32_t       a = 10;   // A\nconst uint32_t b = 10;   // B\nuint32_t       c = 0;    // C\nconst uint32_t d = 0;    // D</code>",
    "hint": "const → .rodata. nonzero non-const → .data. zero non-const → .bss. const zero-init → .rodata (still Flash).",
    "answer": "A → .data; B → .rodata; C → .bss; D → .rodata (const, Flash, no RAM copy needed).",
    "ansCode": null
  },
  {
    "title": "Drill: declare a variable in each section",
    "diff": "medium",
    "desc": "Write one declaration for each: a variable that lands in .bss, one in .data, and one in .rodata.",
    "hint": ".bss = zero-init global. .data = nonzero global. .rodata = const global.",
    "answer": null,
    "ansCode": "uint32_t in_bss;             // .bss — zero-init global\nuint32_t in_data = 7;        // .data — nonzero global\nconst uint32_t in_rodata = 7; // .rodata — const"
  },
  {
    "title": "Trace: local array on stack",
    "diff": "easy",
    "desc": "Approximately how much stack does <code>foo()</code> consume?\n<code>void foo(void) {\n  uint8_t  buf[128];\n  uint32_t crc;\n  uint16_t len;\n}</code>",
    "hint": "Add up the sizes: uint8_t[128] + uint32_t + uint16_t. Alignment may add padding.",
    "answer": "128 + 4 + 2 = 134 bytes minimum. With alignment padding likely 136 bytes (rounded to 4-byte boundary).",
    "ansCode": null
  },
  {
    "title": "Classify: linker section attributes (GCC)",
    "diff": "medium",
    "desc": "Write the GCC attribute to force a variable into a custom linker section named <code>.fast_ram</code>.",
    "hint": "__attribute__((section(\"name\"))) placed after the variable declaration.",
    "answer": null,
    "ansCode": "uint32_t fast_var __attribute__((section(\".fast_ram\"))) = 0;"
  },
  {
    "title": "Trace: what startup code does to .data",
    "diff": "medium",
    "desc": "Write pseudocode (in C) for the startup copy loop that moves .data from Flash to RAM. Assume you have linker symbols: <code>_sdata</code> (RAM start), <code>_edata</code> (RAM end), <code>_sidata</code> (Flash image start).",
    "hint": "It's a simple byte-copy loop from load address to run address.",
    "answer": null,
    "ansCode": "extern uint32_t _sdata, _edata, _sidata;\nuint32_t *dst = &_sdata;\nuint32_t *src = &_sidata;\nwhile (dst < &_edata) *dst++ = *src++;"
  },
  {
    "title": "Trace: what startup code does to .bss",
    "diff": "easy",
    "desc": "Write pseudocode (in C) for the startup zero-fill loop for .bss. Assume linker symbols <code>_sbss</code> and <code>_ebss</code>.",
    "hint": "Simply write 0 to every word between _sbss and _ebss.",
    "answer": null,
    "ansCode": "extern uint32_t _sbss, _ebss;\nuint32_t *p = &_sbss;\nwhile (p < &_ebss) *p++ = 0;"
  },

  // ── STARTUP SEQUENCE ────────────────────────────────────────────

  {
    "title": "List the startup sequence",
    "diff": "medium",
    "desc": "List the operations that happen between power-on reset and the first instruction of <code>main()</code> on a Cortex-M. Name at least 5 distinct steps.",
    "hint": "SP load → PC load → SystemInit → .data copy → .bss zero → main.",
    "answer": "1. HW loads SP from vector[0]. 2. HW loads PC from vector[1] (Reset_Handler). 3. SystemInit (clock/PLL). 4. Copy .data from Flash to RAM. 5. Zero .bss. 6. __libc_init_array (C++ ctors / init_array). 7. Call main().",
    "ansCode": null
  },
  {
    "title": "Drill: write a minimal Reset_Handler",
    "diff": "hard",
    "desc": "Write a minimal bare-metal Reset_Handler in C that copies .data, zeroes .bss, then calls main(). Use linker symbols: _sdata, _edata, _sidata, _sbss, _ebss.",
    "hint": "Two loops then a call to main(). Mark it with __attribute__((naked)) or ensure no prologue.",
    "answer": null,
    "ansCode": "void Reset_Handler(void) {\n  // copy .data from Flash to RAM\n  uint32_t *src = &_sidata, *dst = &_sdata;\n  while (dst < &_edata) *dst++ = *src++;\n  // zero .bss\n  dst = &_sbss;\n  while (dst < &_ebss) *dst++ = 0;\n  // call main\n  main();\n  while(1);\n}"
  },
  {
    "title": "Debug: global not initialised to expected value",
    "diff": "medium",
    "desc": "A developer sets <code>uint32_t speed = 100;</code> globally. At runtime, speed is 0. Startup code was accidentally removed. What step was skipped?",
    "hint": "speed is in .data. What does startup do to .data?",
    "answer": "The .data copy from Flash to RAM was skipped. The initial value (100) exists in Flash but was never copied. RAM holds uninitialised (zero) content.",
    "ansCode": null
  },
  {
    "title": "Debug: zero-init global has garbage value",
    "diff": "medium",
    "desc": "A developer declares <code>uint32_t counter;</code> globally and expects it to be 0. At runtime it holds 0xDEADBEEF. What startup step was missing?",
    "hint": "counter is in .bss. What guarantees it is zero?",
    "answer": "The .bss zero-fill loop was not executed. Without it, .bss RAM retains whatever the RAM contained at power-on (often 0xDEADBEEF from a debug fill pattern).",
    "ansCode": null
  },
  {
    "title": "Trace: vector table first two entries",
    "diff": "medium",
    "desc": "On Cortex-M, what are the first two entries in the vector table and what does the hardware do with them at reset?",
    "hint": "Entry 0 = SP init value, Entry 1 = Reset_Handler address.",
    "answer": "Entry 0: initial stack pointer value (loaded into MSP by hardware). Entry 1: reset handler address (loaded into PC by hardware). The CPU begins executing at Reset_Handler automatically.",
    "ansCode": null
  },
  {
    "title": "Drill: define a minimal vector table in C",
    "diff": "hard",
    "desc": "Write a C definition for a minimal Cortex-M vector table with only SP_init and Reset_Handler. Place it in section <code>.isr_vector</code>.",
    "hint": "It is an array of uint32_t (or void(*)(void) function pointers). First entry is SP value, second is Reset address.",
    "answer": null,
    "ansCode": "extern uint32_t _stack_top;\nvoid Reset_Handler(void);\n\n__attribute__((section(\".isr_vector\")))\nconst uint32_t vector_table[] = {\n  (uint32_t)&_stack_top,    // initial SP\n  (uint32_t)Reset_Handler   // reset handler\n};"
  },

  // ── STACK ───────────────────────────────────────────────────────

  {
    "title": "Trace: stack depth for nested calls",
    "diff": "medium",
    "desc": "Estimate the maximum stack depth (in bytes) during the call chain <code>main → A → B → C</code>. Each function has one <code>uint8_t buf[64]</code> local and one <code>uint32_t</code> local. Assume 8-byte frame overhead per call.",
    "hint": "All four frames coexist when C is running. Add them up.",
    "answer": "Each frame: 64 + 4 + 8 overhead = 76 bytes. Four frames active simultaneously: 76 × 4 = 304 bytes minimum.",
    "ansCode": null
  },
  {
    "title": "Drill: stack canary pattern",
    "diff": "medium",
    "desc": "Write code to paint a stack canary pattern (<code>0xDEADBEEF</code>) at the stack guard zone starting at <code>0x20001000</code>, covering 32 bytes. Then write a check function that returns 1 if the canary is intact.",
    "hint": "Paint: write the pattern to each uint32_t in the zone. Check: read back and compare.",
    "answer": null,
    "ansCode": "#define CANARY_ADDR ((volatile uint32_t*)0x20001000)\n#define CANARY_WORDS 8\n#define CANARY_VAL 0xDEADBEEFU\n\nvoid canary_paint(void) {\n  for (int i = 0; i < CANARY_WORDS; i++)\n    CANARY_ADDR[i] = CANARY_VAL;\n}\nint canary_ok(void) {\n  for (int i = 0; i < CANARY_WORDS; i++)\n    if (CANARY_ADDR[i] != CANARY_VAL) return 0;\n  return 1;\n}"
  },
  {
    "title": "Debug: detect stack overflow with canary",
    "diff": "hard",
    "desc": "On an MCU with 8 KB RAM at 0x20000000, .bss ends at 0x20001200, and the stack starts at the top (0x20002000, grows down). Describe two techniques to detect a stack overflow before it corrupts .bss.",
    "hint": "Canary values and MPU guard regions.",
    "answer": "1. Stack canary: fill 0xDEADBEEF at 0x20001200 (boundary). Check periodically in a watchdog task or idle loop. 2. MPU guard: configure a no-access MPU region at 0x20001200 (32 bytes). Any stack write there causes a MemManage fault, which firmware catches to log and reset.",
    "ansCode": null
  },
  {
    "title": "Trace: stack pointer before and after function call",
    "diff": "medium",
    "desc": "SP = 0x20002000 before calling <code>foo()</code>. foo() has one local <code>uint8_t buf[256]</code>. Approximately what is SP inside foo() (ignore return address overhead)?",
    "hint": "Stack grows downward. 256 bytes of locals means SP decreases by 256.",
    "answer": "SP ≈ 0x20002000 − 256 = 0x20001F00 (exact value depends on alignment and compiler overhead).",
    "ansCode": null
  },
  {
    "title": "Drill: large local causes stack overflow — fix it",
    "diff": "medium",
    "desc": "This function is called from an ISR. It crashes with a stack overflow. The MCU has 4 KB total stack. Fix without using malloc.\n<code>void process_frame(void) {\n  uint8_t frame[2048];\n  parse(frame, 2048);\n}</code>",
    "hint": "Move the buffer out of the stack. What storage class keeps it alive but off the stack?",
    "answer": null,
    "ansCode": "static uint8_t frame[2048];  // moved to .bss — off the stack\nvoid process_frame(void) {\n  parse(frame, 2048);\n}"
  },
  {
    "title": "Trace: recursive function stack growth",
    "diff": "hard",
    "desc": "This function recurses N times. Each frame uses ~40 bytes. The stack is 2 KB. What is the maximum safe value of N?\n<code>void recurse(int n) {\n  uint8_t local[32];\n  if (n > 0) recurse(n - 1);\n}</code>",
    "hint": "Total stack consumed = N × frame_size. Keep it under stack limit.",
    "answer": "2048 / 40 ≈ 51. Maximum safe N ≈ 50 (leaving some margin for the call chain above and frame overhead).",
    "ansCode": null
  },
  {
    "title": "Debug: ISR stack vs task stack",
    "diff": "hard",
    "desc": "On Cortex-M with an RTOS, a task has 512-byte stack and works fine. But it crashes when an interrupt fires during task execution. The ISR has one local <code>uint8_t tmp[256]</code>. What is wrong?",
    "hint": "On Cortex-M, which stack does the ISR use?",
    "answer": "Cortex-M ISRs use the Main Stack Pointer (MSP), not the Process Stack Pointer (PSP) used by RTOS tasks. If MSP (the main stack) is small, the ISR's 256-byte local overflows it. Increase MSP stack size or remove large ISR locals.",
    "ansCode": null
  },

  // ── LINKER SCRIPT ───────────────────────────────────────────────

  {
    "title": "Read a linker script: identify sections",
    "diff": "medium",
    "desc": "Given this linker script snippet, answer: where does .text live? Where does .data live at load time vs run time?\n<code>MEMORY {\n  FLASH (rx)  : ORIGIN = 0x08000000, LENGTH = 256K\n  RAM   (rwx) : ORIGIN = 0x20000000, LENGTH = 64K\n}\nSECTIONS {\n  .text  : { *(.text) } > FLASH\n  .data  : { *(.data) } > RAM AT> FLASH\n}</code>",
    "hint": "'>RAM AT>FLASH' means VMA in RAM, LMA in Flash.",
    "answer": ".text lives entirely in Flash (both load and run address). .data runs in RAM (VMA 0x20000000) but its initial image is stored in Flash (LMA). Startup copies it from Flash to RAM.",
    "ansCode": null
  },
  {
    "title": "Drill: compute used Flash from linker output",
    "diff": "medium",
    "desc": "A build produces:\n<code>.text  : 0x08000000  12480 bytes\n.rodata: 0x08003000   2048 bytes\n.data  : load 0x08003800, run 0x20000000, 512 bytes</code>\nHow many bytes of Flash are used in total?",
    "hint": "Flash holds .text, .rodata, AND the load image of .data.",
    "answer": "Flash used = 12480 + 2048 + 512 = 15040 bytes.",
    "ansCode": null
  },
  {
    "title": "Drill: compute used RAM from linker output",
    "diff": "medium",
    "desc": "Same build as above. Additionally:\n<code>.bss : 0x20000200  1024 bytes\nStack: 0x20001000  2048 bytes (fixed)</code>\nHow many bytes of RAM are used?",
    "hint": "RAM holds .data (run), .bss, heap (if any), and stack.",
    "answer": "RAM used = 512 (.data) + 1024 (.bss) + 2048 (stack) = 3584 bytes.",
    "ansCode": null
  },
  {
    "title": "Drill: place code in RAM for speed (RAMFUNC)",
    "diff": "hard",
    "desc": "Write a GCC declaration that places the function <code>fast_isr()</code> in section <code>.ramfunc</code> (copied to RAM at startup for faster execution from SRAM).",
    "hint": "__attribute__((section(\".ramfunc\"))) and optionally __attribute__((noinline)) so it isn't merged.",
    "answer": null,
    "ansCode": "void fast_isr(void) __attribute__((section(\".ramfunc\"), noinline));\nvoid fast_isr(void) {\n  // executes from RAM — no Flash wait states\n}"
  },
  {
    "title": "Trace: what happens when Flash write-protect is on and .data copy fails",
    "diff": "hard",
    "desc": "Flash is write-protected. The startup tries to copy .data from Flash to RAM. Does this fail? Explain why the copy always works even with Flash write-protect active.",
    "hint": "Write-protect prevents writing TO Flash, not reading FROM it.",
    "answer": "The copy reads from Flash (always allowed) and writes to RAM. Flash write-protect only blocks writes to Flash. The copy succeeds regardless of write-protect status.",
    "ansCode": null
  },

  // ── HEAP ────────────────────────────────────────────────────────

  {
    "title": "Trace: heap layout in RAM",
    "diff": "medium",
    "desc": "RAM = 64 KB at 0x20000000. .bss ends at 0x20003000. Stack top = 0x20010000 (grows down). What is the maximum heap size available if the heap grows upward from _end?",
    "hint": "Heap occupies the space between end of .bss and bottom of stack.",
    "answer": "Heap max = 0x20010000 − 0x20003000 = 0xD000 = 52224 bytes (52 KB). In practice reserve margin so heap and stack don't collide.",
    "ansCode": null
  },
  {
    "title": "Debug: malloc returns NULL on embedded target",
    "diff": "medium",
    "desc": "A developer calls <code>malloc(1024)</code> and it returns NULL even though the MCU has 64 KB RAM. The linker script allocates only 256 bytes for the heap. What must be changed?",
    "hint": "The heap size is fixed by a linker script symbol or a section size.",
    "answer": "Increase the __heap_size symbol (or HEAP memory region) in the linker script. With only 256 bytes, any allocation > 256 bytes fails immediately. Set it to at least the maximum single allocation plus overhead.",
    "ansCode": null
  },
  {
    "title": "Drill: implement a minimal sbrk for newlib",
    "diff": "hard",
    "desc": "Write a minimal <code>_sbrk()</code> implementation that newlib calls to grow the heap. Use linker symbol <code>_end</code> as heap start and check against a fixed <code>HEAP_LIMIT</code> address.",
    "hint": "sbrk() returns the old heap break and advances it by incr bytes.",
    "answer": null,
    "ansCode": "#define HEAP_LIMIT 0x20008000UL\nextern char _end;\nstatic char *heap_ptr = &_end;\nvoid *_sbrk(int incr) {\n  char *prev = heap_ptr;\n  if ((uint32_t)(heap_ptr + incr) > HEAP_LIMIT) return (void*)-1;\n  heap_ptr += incr;\n  return prev;\n}"
  },
  {
    "title": "Debug: heap fragmentation — why malloc fails after many alloc/free cycles",
    "diff": "hard",
    "desc": "Firmware alternates between allocating 100-byte and 50-byte buffers, then freeing the 100-byte ones. After 1000 cycles, malloc(100) fails even though 10 KB is 'free'. Explain why.",
    "hint": "Think about what the freed 100-byte holes look like to the allocator after 50-byte blocks are interleaved.",
    "answer": "Heap fragmentation: the freed 100-byte holes are separated by live 50-byte blocks. No single contiguous 100-byte free region exists even though total free bytes > 100. This is why embedded firmware avoids dynamic allocation — use static or pool allocators instead.",
    "ansCode": null
  },

  // ── MPU / MEMORY PROTECTION ─────────────────────────────────────

  {
    "title": "Drill: configure MPU guard region for stack overflow",
    "diff": "hard",
    "desc": "Write bare-metal code to configure MPU region 0 as a 32-byte no-access guard at address 0x20001200 on Cortex-M3/M4. MPU base: 0xE000ED9C, RBAR offset 0, RASR offset 4.",
    "hint": "RASR: SIZE field for 32 bytes = 4 (2^(4+1)=32). AP=0b000 = no access. Enable bit 0 of RASR.",
    "answer": null,
    "ansCode": "volatile uint32_t *MPU_CTRL = (volatile uint32_t*)0xE000ED94;\nvolatile uint32_t *MPU_RBAR = (volatile uint32_t*)0xE000ED9C;\nvolatile uint32_t *MPU_RASR = (volatile uint32_t*)0xE000EDA0;\n\n*MPU_RBAR = 0x20001200 | (1U<<4) | 0;  // base addr, VALID, region 0\n*MPU_RASR = (0b000<<24)              // AP: no access\n          | (4<<1)                   // SIZE: 32 bytes (2^(4+1))\n          | (1U<<0);                 // ENABLE\n*MPU_CTRL = (1U<<2)|(1U<<0);         // PRIVDEFENA + ENABLE"
  },
  {
    "title": "Trace: what happens when stack hits MPU guard",
    "diff": "medium",
    "desc": "An MPU no-access guard is at 0x20001200. SP is at 0x20001220 and a function tries to allocate 64 bytes on the stack. Trace what happens step by step.",
    "hint": "SP would go to 0x20001220 - 64 = 0x200011E0, which is inside the guard region.",
    "answer": "SP would move to 0x200011E0, crossing into the MPU guard at 0x20001200. The first write to the guarded region triggers a MemManage fault. The CPU enters the MemManage_Handler instead of executing the function — stack overflow is caught rather than silently corrupting .bss.",
    "ansCode": null
  },

  // ── SECTION PLACEMENT TRICKS ────────────────────────────────────

  {
    "title": "Drill: place a variable in a specific RAM bank",
    "diff": "medium",
    "desc": "STM32F7 has CCM-SRAM at 0x20000000 and DTCM at 0x20020000. Write a declaration to place <code>uint8_t dma_buf[512]</code> in a section named <code>.dtcm_ram</code>.",
    "hint": "Use __attribute__((section(\"name\"))).",
    "answer": null,
    "ansCode": "uint8_t dma_buf[512] __attribute__((section(\".dtcm_ram\")));"
  },
  {
    "title": "Drill: force a variable to Flash (ROM)",
    "diff": "easy",
    "desc": "Write a global lookup table of 16 uint32_t values that will definitely live in Flash, not RAM, even on compilers that might move it.",
    "hint": "const is the key. On most targets, const globals go to .rodata in Flash.",
    "answer": null,
    "ansCode": "const uint32_t lut[16] = {\n  0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77,\n  0x88,0x99,0xAA,0xBB,0xCC,0xDD,0xEE,0xFF\n};"
  },
  {
    "title": "Trace: sizeof sections after adding a variable",
    "diff": "medium",
    "desc": "Before adding any new code, build reports: .data = 200 bytes, .bss = 400 bytes, .text = 8192 bytes.\nAfter adding these three declarations, how does each section change?\n<code>uint32_t a = 99;        // new\nchar msg[] = \"hello\";   // new\nstatic uint16_t b;       // new</code>",
    "hint": "a is .data (+4). msg is .data (+6, including null terminator). b is .bss (+2).",
    "answer": ".data grows by 4 (a) + 6 (msg including null) = +10 bytes → 210 bytes. .bss grows by 2 (b) → 402 bytes. .text unchanged.",
    "ansCode": null
  },
  {
    "title": "Drill: weak symbol default handler",
    "diff": "medium",
    "desc": "Write a weak default IRQ handler named <code>Default_Handler</code> that loops forever, then declare <code>TIM3_IRQHandler</code> as an alias pointing to it (so it can be overridden by user code).",
    "hint": "__attribute__((weak, alias(\"target\"))) creates a weak alias.",
    "answer": null,
    "ansCode": "void Default_Handler(void) __attribute__((weak));\nvoid Default_Handler(void) { while(1); }\nvoid TIM3_IRQHandler(void) __attribute__((weak, alias(\"Default_Handler\")));"
  },
  {
    "title": "Trace: Flash usage of .rodata vs .data initialisers",
    "diff": "medium",
    "desc": "Compare Flash usage:\n<code>// Option A:\nconst uint8_t table[1024] = { /* values */ };\n// Option B:\nuint8_t table[1024] = { /* same values */ };</code>\nDoes Option B use more Flash? How much more RAM?",
    "hint": "Both store the initial values in Flash. But Option B also occupies RAM at runtime.",
    "answer": "Flash usage is identical — both store 1024 bytes in Flash. Option B uses an additional 1024 bytes of RAM (.data). Option A uses 0 RAM (.rodata stays in Flash). Prefer const for lookup tables.",
    "ansCode": null
  },

  // ── ADVANCED / DEBUGGING ────────────────────────────────────────

  {
    "title": "Debug: static variable shared across calls causes bug in reentrant ISR",
    "diff": "hard",
    "desc": "A static local in a function is used as a state variable. The function is called from both main and an ISR. Sometimes state is corrupted. Why, and how do you fix it?",
    "hint": "Static locals are shared — they are not per-call. An ISR preempting main mid-function sees the same variable.",
    "answer": "Static variables are a single RAM location shared by all callers. If an ISR preempts main while main is in the middle of modifying it, the ISR sees a partially-updated value. Fix: disable interrupts around critical sections, or move state to a caller-owned struct passed as argument (making the function reentrant).",
    "ansCode": null
  },
  {
    "title": "Trace: map file — find where a variable lives",
    "diff": "medium",
    "desc": "The linker map contains:\n<code>.bss 0x20001000  0x200\n  0x20001000  counter   build/main.o\n  0x20001004  rx_head   build/uart.o</code>\nWhat is the address of <code>rx_head</code> and what does it mean that both are in .bss?",
    "hint": "Both are zero-initialised globals. Their addresses are in the .bss RAM region.",
    "answer": "rx_head is at 0x20001004. Both are zero-initialised globals placed in RAM. The linker assigned consecutive addresses. Startup code zeros the entire .bss region (0x20001000 to 0x20001200) before main().",
    "ansCode": null
  },
  {
    "title": "Debug: const global modified through non-const pointer — what happens?",
    "diff": "hard",
    "desc": "This compiles without error. What happens at runtime on an MCU where .rodata is in write-protected Flash?\n<code>const uint32_t cfg = 42;\nvoid hack(void) {\n  uint32_t *p = (uint32_t*)&cfg;\n  *p = 99;\n}</code>",
    "hint": "cfg lives in Flash. What happens when you write to Flash without using the Flash programming interface?",
    "answer": "On most Cortex-M targets, .rodata is in Flash which is write-protected by default. The write *p = 99 causes a BusFault or HardFault (bus error on locked Flash). On targets that execute .rodata from RAM it would silently succeed — another reason to always treat const data as truly immutable.",
    "ansCode": null
  },
  {
    "title": "Drill: compute total MCU memory budget",
    "diff": "medium",
    "desc": "An STM32F103 has 64 KB Flash and 20 KB RAM. A build reports:\n.text = 18432 bytes, .rodata = 2048 bytes, .data = 512 bytes (load in Flash, run in RAM), .bss = 3072 bytes, stack = 4096 bytes.\nDoes the firmware fit? How much Flash and RAM headroom remains?",
    "hint": "Flash = .text + .rodata + .data_image. RAM = .data + .bss + stack.",
    "answer": "Flash used = 18432 + 2048 + 512 = 20992 bytes. Flash headroom = 65536 − 20992 = 44544 bytes (OK). RAM used = 512 + 3072 + 4096 = 7680 bytes. RAM headroom = 20480 − 7680 = 12800 bytes (OK). Firmware fits.",
    "ansCode": null
  },
  {
    "title": "Trace: what objdump -h shows for each section",
    "diff": "medium",
    "desc": "Given objdump -h output:\n<code>Idx Name   Size     VMA        LMA\n  0 .text  00003000 08000000   08000000\n  1 .data  00000200 20000000   08003000\n  2 .bss   00000400 20000200   20000200</code>\nExplain: why does .bss have LMA == VMA? Why does .data have LMA != VMA?",
    "hint": "LMA = load address (where it is stored). VMA = virtual/run address (where it runs).",
    "answer": ".data: LMA 0x08003000 (Flash, where initial values are stored) ≠ VMA 0x20000000 (RAM, where it runs). Startup copies LMA→VMA. .bss: no initial data to store, so LMA == VMA — it exists only in RAM and is zeroed by startup (no Flash copy needed).",
    "ansCode": null
  },
  {
    "title": "Drill: noinit section — variable survives software reset",
    "diff": "hard",
    "desc": "Declare a variable <code>reset_reason</code> in a <code>.noinit</code> section so that startup code does NOT zero it, allowing it to persist across software resets.",
    "hint": "Place it in a custom section excluded from the .bss zero loop in the linker script.",
    "answer": null,
    "ansCode": "uint32_t reset_reason __attribute__((section(\".noinit\")));\n// In linker script, .noinit must be listed but NOT included in the bss zero loop."
  },
  {
    "title": "Debug: why printf output is wrong after bootloader jump",
    "diff": "hard",
    "desc": "A bootloader jumps to application firmware. The application's UART printf outputs garbage. The application code is correct when run standalone (no bootloader). What memory layout issue causes this?",
    "hint": "Does the application's startup code run before main()?",
    "answer": "When the bootloader jumps directly to the application's main() (skipping Reset_Handler), the .data copy and .bss zero steps never run. Globals hold incorrect values (stale Flash/RAM from bootloader). Fix: jump to the application's Reset_Handler, not main(), so the full startup sequence executes.",
    "ansCode": null
  },
  {
    "title": "Trace: where function arguments and return values live",
    "diff": "medium",
    "desc": "On ARM AAPCS, where are the first four function arguments passed? Where is the return value? What happens when a function has 6 arguments?",
    "hint": "AAPCS: r0–r3 for first 4 args. r0 for return. Extra args go on the stack.",
    "answer": "First 4 arguments: r0, r1, r2, r3 (registers — no stack cost). Return value: r0 (or r0:r1 for 64-bit). Arguments 5 and 6: pushed onto the stack by the caller before the call — each costs 4 bytes of stack per word.",
    "ansCode": null
  },
  {
    "title": "Drill: __attribute__((used)) to prevent linker garbage collection",
    "diff": "medium",
    "desc": "The linker strips <code>debug_snapshot()</code> because no C code calls it (it's called via debugger watchpoint). Write the declaration that prevents this.",
    "hint": "__attribute__((used)) tells the linker: keep this symbol even if unreferenced.",
    "answer": null,
    "ansCode": "void debug_snapshot(void) __attribute__((used));\nvoid debug_snapshot(void) {\n  // can be called from debugger — linker won't remove it\n}"
  },
  {
    "title": "Trace: impact of -fdata-sections and -ffunction-sections",
    "diff": "hard",
    "desc": "A build without -ffunction-sections uses 24 KB Flash. With -ffunction-sections and --gc-sections the same build uses 18 KB. Explain why.",
    "hint": "Without per-function sections, the linker cannot discard individual unused functions.",
    "answer": "Without -ffunction-sections, all functions in an object file are in one .text blob — if any function is referenced the whole blob is kept. With -ffunction-sections each function gets its own section; --gc-sections then discards unreferenced sections (dead-code elimination). Result: 6 KB of unused functions removed.",
    "ansCode": null
  },
  {
    "title": "Drill: check remaining stack at runtime",
    "diff": "hard",
    "desc": "Write a function <code>stack_remaining()</code> that returns how many bytes of stack are unused, given that the stack was painted with <code>0xA5</code> from its base upward at startup. Stack base = 0x20001200, stack top = 0x20002000.",
    "hint": "Walk from base upward until you find a non-0xA5 byte — that's the high-water mark.",
    "answer": null,
    "ansCode": "#define STACK_BASE ((volatile uint8_t*)0x20001200)\n#define STACK_TOP  0x20002000U\n\nuint32_t stack_remaining(void) {\n  volatile uint8_t *p = STACK_BASE;\n  while ((uint32_t)p < STACK_TOP && *p == 0xA5) p++;\n  return (uint32_t)p - (uint32_t)STACK_BASE;\n}"
  },

  // ── MIXED RECALL DRILLS ─────────────────────────────────────────

  {
    "title": "Recall: which section for each storage class",
    "diff": "easy",
    "desc": "Fill in the section for each:\n1. <code>int x;</code> at file scope\n2. <code>int x = 0;</code> at file scope\n3. <code>int x = 5;</code> at file scope\n4. <code>const int x = 5;</code> at file scope\n5. <code>int x;</code> inside a function (no static)",
    "hint": "Section depends on: const? initialised? zero-init? local?",
    "answer": "1 → .bss; 2 → .bss (zero-init); 3 → .data; 4 → .rodata; 5 → stack (automatic storage).",
    "ansCode": null
  },
  {
    "title": "Drill: write the size of each section from declarations",
    "diff": "medium",
    "desc": "How many bytes does each section grow by after adding these declarations?\n<code>uint32_t a = 1;           // 4 bytes\nconst uint16_t b = 2;     // 2 bytes\nuint8_t  c[10];            // 10 bytes\nstatic float d = 3.14f;   // 4 bytes</code>",
    "hint": "a → .data, b → .rodata, c → .bss, d → .data (nonzero static).",
    "answer": ".data grows by 8 (a=4, d=4). .rodata grows by 2 (b). .bss grows by 10 (c).",
    "ansCode": null
  },
  {
    "title": "Trace: startup time impact of large .data",
    "diff": "medium",
    "desc": "A .data section is 32 KB. Flash read speed is 32 MB/s. Approximately how long does the startup .data copy take, ignoring overhead?",
    "hint": "time = size / speed.",
    "answer": "32 KB / 32 MB/s = 32768 / 33554432 ≈ 0.977 ms ≈ 1 ms. Large .data noticeably delays startup — prefer const (rodata) for large tables.",
    "ansCode": null
  },
  {
    "title": "Drill: identify why BSS is not in the binary",
    "diff": "easy",
    "desc": "A developer is confused: the .elf file shows .bss = 4096 bytes but the .bin file is 4096 bytes smaller than expected. Explain.",
    "hint": ".bss has no content to store — only its size is recorded.",
    "answer": ".bss variables are zero-initialised by startup code — there is nothing to store in the binary. The binary only contains .text, .rodata, and the .data load image. .bss just records its size so startup knows how many bytes to zero.",
    "ansCode": null
  },
  {
    "title": "Debug: printf of a const string prints garbage",
    "diff": "medium",
    "desc": "A const string defined in one compilation unit prints garbage when referenced from another. The linker map shows it at a Flash address. What is the likely cause on Harvard architecture with separate instruction/data buses?",
    "hint": "Some Harvard cores cannot read .rodata via the data bus if it's placed in program memory.",
    "answer": "On some Harvard-architecture MCUs (e.g. AVR), Flash is only readable via special instructions (pgm_read_byte), not via normal data pointers. Placing strings in .rodata and reading with a normal pointer gives garbage. Fix: use PROGMEM and pgm_read_byte, or ensure the linker places strings in a data-accessible Flash region.",
    "ansCode": null
  }
];