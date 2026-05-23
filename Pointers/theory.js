window._theory_Pointers = `
  <h1 class="topic-title">Pointers <span class="topic-tag">Core</span></h1>

  <p class="topic-intro">
    A pointer stores the memory address of another variable.
    Pointers are one of the most important concepts in Embedded C because
    hardware itself is accessed through memory addresses.
  </p>

  <div class="callout">
    <div>
      In firmware development, pointers are everywhere:
      GPIO registers, DMA buffers, interrupt vectors, peripheral drivers,
      communication stacks, linked buffers, RTOS queues, and memory-mapped hardware.
    </div>
  </div>

  <div class="section-label">What actually lives inside a pointer?</div>

  <div class="viz-box">
    <div class="viz-label">RAM visualization</div>

    <table class="mem-table">
      <tr>
        <td class="addr">0x20000000</td>
        <td class="val">42</td>
        <td class="note">int x = 42</td>
      </tr>

      <tr>
        <td class="addr">0x20000004</td>
        <td class="ptr">0x20000000</td>
        <td class="note">int *p = &amp;x</td>
      </tr>
    </table>

    <div style="margin-top:12px;font-size:13px;color:var(--text2)">
      Pointer <code>p</code> does NOT store the value 42.
      It stores the ADDRESS where 42 exists.
    </div>
  </div>

  <div class="section-label">The 2 most important operators</div>

  <div class="card-grid">
    <div class="card">
      <h4>&amp; Address-of operator</h4>
      <p>
        Gives the memory address of a variable.
      </p>

      <div class="code-inline">
        int *p = &amp;x;
      </div>
    </div>

    <div class="card">
      <h4>* Dereference operator</h4>
      <p>
        Accesses the value stored at an address.
      </p>

      <div class="code-inline">
        int value = *p;
      </div>
    </div>
  </div>

  <div class="section-label">Core syntax</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>pointers.c</span>
    </div>

    <div class="code-block">
<span class="kw">int</span> x = <span class="num">42</span>;

<span class="kw">int</span> *p = &amp;x;      <span class="cm">// p stores address of x</span>

<span class="kw">int</span> y = *p;       <span class="cm">// dereference → reads 42</span>

*p = <span class="num">100</span>;         <span class="cm">// writes through pointer</span>

<span class="cm">// x is now 100</span>
    </div>
  </div>

  <div class="section-label">Step-by-step execution</div>

  <div class="card-grid">

    <div class="card">
      <h4>Step 1</h4>
      <p>
        Variable <code>x</code> is created somewhere in RAM.
      </p>
    </div>

    <div class="card">
      <h4>Step 2</h4>
      <p>
        <code>&amp;x</code> obtains the address of x.
      </p>
    </div>

    <div class="card">
      <h4>Step 3</h4>
      <p>
        Pointer <code>p</code> stores that address.
      </p>
    </div>

    <div class="card">
      <h4>Step 4</h4>
      <p>
        <code>*p</code> follows the address and accesses x.
      </p>
    </div>

  </div>

  <div class="section-label">Pointer size</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>pointer_size.c</span>
    </div>

    <div class="code-block">
<span class="kw">int</span> *p1;
<span class="kw">char</span> *p2;
<span class="kw">float</span> *p3;

<span class="fn">sizeof</span>(p1);
<span class="fn">sizeof</span>(p2);
<span class="fn">sizeof</span>(p3);
    </div>
  </div>

  <div class="callout">
    <div>
      All pointer types usually have SAME size on a given architecture.
      On a 32-bit MCU → pointers are usually 4 bytes.
    </div>
  </div>

  <div class="section-label">Typed pointers</div>

  <div class="card-grid">

    <div class="card">
      <h4>int*</h4>
      <p>Points to integer data.</p>
    </div>

    <div class="card">
      <h4>char*</h4>
      <p>Points to character data.</p>
    </div>

    <div class="card">
      <h4>float*</h4>
      <p>Points to floating point data.</p>
    </div>

    <div class="card">
      <h4>uint32_t*</h4>
      <p>Very common in embedded register programming.</p>
    </div>

  </div>

  <div class="section-label">Why pointer type matters</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>pointer_arithmetic.c</span>
    </div>

    <div class="code-block">
<span class="kw">uint8_t</span>  *a;
<span class="kw">uint32_t</span> *b;

a++;   <span class="cm">// moves by 1 byte</span>

b++;   <span class="cm">// moves by 4 bytes</span>
    </div>
  </div>

  <div class="callout warn">
    <div>
      Pointer arithmetic scales by sizeof(type).
      This is one of the most important pointer concepts.
    </div>
  </div>

  <div class="section-label">Pointer arithmetic visualized</div>

  <div class="viz-box">
    <div class="viz-label">uint32_t pointer</div>

    <table class="mem-table">
      <tr>
        <td class="addr">0x20000000</td>
        <td class="val">A</td>
      </tr>

      <tr>
        <td class="addr">0x20000004</td>
        <td class="val">B</td>
      </tr>

      <tr>
        <td class="addr">0x20000008</td>
        <td class="val">C</td>
      </tr>
    </table>

    <div style="margin-top:10px;color:var(--text2)">
      p++ jumps from 0x20000000 → 0x20000004
    </div>
  </div>

  <div class="section-label">Pointers and arrays</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>arrays.c</span>
    </div>

    <div class="code-block">
<span class="kw">int</span> arr[<span class="num">3</span>] = {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>};

<span class="kw">int</span> *p = arr;

<span class="cm">// Same thing</span>
arr[<span class="num">0</span>]
*(arr + <span class="num">0</span>)

arr[<span class="num">1</span>]
*(arr + <span class="num">1</span>)

arr[<span class="num">2</span>]
*(arr + <span class="num">2</span>)
    </div>
  </div>

  <div class="callout">
    <div>
      Array indexing internally uses pointer arithmetic.
    </div>
  </div>

  <div class="section-label">Array name decay</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>array_decay.c</span>
    </div>

    <div class="code-block">
<span class="kw">void</span> process(<span class="kw">uint8_t</span> *buf);

<span class="kw">uint8_t</span> data[<span class="num">10</span>];

process(data);
    </div>
  </div>

  <div class="callout">
    <div>
      When passed to a function,
      array names decay into pointers.
    </div>
  </div>

  <div class="section-label">Array vs pointer — critical difference</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>array_vs_pointer.c</span>
    </div>

    <div class="code-block">
<span class="kw">uint8_t</span> arr[<span class="num">8</span>];

<span class="kw">uint8_t</span> *ptr = arr;

<span class="fn">sizeof</span>(arr);   <span class="cm">// 8</span>

<span class="fn">sizeof</span>(ptr);   <span class="cm">// 4 on 32-bit MCU</span>
    </div>
  </div>

  <div class="section-label">Pass by reference using pointers</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>swap.c</span>
    </div>

    <div class="code-block">
<span class="kw">void</span> swap(<span class="kw">int</span> *a, <span class="kw">int</span> *b)
{
    <span class="kw">int</span> temp = *a;

    *a = *b;

    *b = temp;
}

swap(&amp;x, &amp;y);
    </div>
  </div>

  <div class="callout">
    <div>
      Pointers allow functions to modify caller variables directly.
    </div>
  </div>

  <div class="section-label">Pointers to pointers (double pointers)</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>double_ptr.c</span>
    </div>

    <div class="code-block">
<span class="kw">int</span> x = <span class="num">10</span>;

<span class="kw">int</span> *p = &amp;x;

<span class="kw">int</span> **pp = &amp;p;

**pp = <span class="num">99</span>;
    </div>
  </div>

  <div class="callout">
    <div>
      <code>**pp</code> ultimately reaches x.
    </div>
  </div>

  <div class="section-label">void* — generic pointer</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>void_ptr.c</span>
    </div>

    <div class="code-block">
<span class="kw">uint8_t</span> buffer[<span class="num">32</span>];

<span class="kw">void</span> *vp = buffer;

<span class="kw">uint8_t</span> x = *((<span class="kw">uint8_t</span>*)vp);
    </div>
  </div>

  <div class="callout warn">
    <div>
      You cannot dereference a void pointer directly.
      It must first be cast to a valid type.
    </div>
  </div>

  <div class="section-label">Function pointers</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>function_ptr.c</span>
    </div>

    <div class="code-block">
<span class="kw">void</span> led_on(<span class="kw">void</span>)
{
}

<span class="kw">void</span> (*handler)(<span class="kw">void</span>) = led_on;

handler();
    </div>
  </div>

  <div class="callout">
    <div>
      Function pointers are heavily used in:
      callbacks,
      interrupt vector tables,
      RTOS schedulers,
      state machines,
      communication stacks.
    </div>
  </div>

  <div class="section-label">Pointers to hardware registers</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>registers.c</span>
    </div>

    <div class="code-block">
<span class="kw">volatile uint32_t</span> *GPIOA_ODR =
    (<span class="kw">volatile uint32_t</span>*)<span class="num">0x40020014</span>;

*GPIOA_ODR |= (<span class="num">1</span> &lt;&lt; <span class="num">5</span>);
    </div>
  </div>

  <div class="callout">
    <div>
      This is memory-mapped I/O.
      The MCU exposes peripheral registers as memory addresses.
    </div>
  </div>

  <div class="section-label">Why volatile matters</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>volatile.c</span>
    </div>

    <div class="code-block">
<span class="kw">volatile uint32_t</span> *UART_STATUS =
    (<span class="kw">volatile uint32_t</span>*)<span class="num">0x40011000</span>;

<span class="kw">while</span>((*UART_STATUS &amp; <span class="num">1</span>) == <span class="num">0</span>)
{
}
    </div>
  </div>

  <div class="callout warn">
    <div>
      Without volatile,
      compiler optimizations may completely break hardware polling code.
    </div>
  </div>

  <div class="section-label">const correctness</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>const_ptr.c</span>
    </div>

    <div class="code-block">
<span class="kw">const int</span> *p1;       <span class="cm">// data cannot change</span>

<span class="kw">int</span> * <span class="kw">const</span> p2 = &amp;x;  <span class="cm">// pointer cannot move</span>

<span class="kw">const int</span> * <span class="kw">const</span> p3 = &amp;x;
    </div>
  </div>

  <div class="section-label">NULL pointers</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>null.c</span>
    </div>

    <div class="code-block">
<span class="kw">int</span> *p = NULL;

<span class="kw">if</span>(p != NULL)
{
    *p = <span class="num">10</span>;
}
    </div>
  </div>

  <div class="callout warn">
    <div>
      Dereferencing NULL causes undefined behaviour.
      On Cortex-M it often causes HardFault.
    </div>
  </div>

  <div class="section-label">Common pointer bugs</div>

  <div class="card-grid">

    <div class="card">
      <h4>Wild pointer</h4>
      <p>
        Uninitialized pointer containing garbage address.
      </p>
    </div>

    <div class="card">
      <h4>Dangling pointer</h4>
      <p>
        Pointer referencing destroyed stack memory.
      </p>
    </div>

    <div class="card">
      <h4>NULL dereference</h4>
      <p>
        Dereferencing invalid address 0.
      </p>
    </div>

    <div class="card">
      <h4>Buffer overrun</h4>
      <p>
        Pointer arithmetic outside array bounds.
      </p>
    </div>

    <div class="card">
      <h4>Wrong cast</h4>
      <p>
        Invalid pointer casting causing alignment faults.
      </p>
    </div>

    <div class="card">
      <h4>Use-after-free</h4>
      <p>
        Common in heap systems and RTOS applications.
      </p>
    </div>

  </div>

  <div class="section-label">Alignment in embedded systems</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>alignment.c</span>
    </div>

    <div class="code-block">
<span class="kw">uint8_t</span> *p = (<span class="kw">uint8_t</span>*)<span class="num">0x20000001</span>;

<span class="kw">uint32_t</span> *q = (<span class="kw">uint32_t</span>*)p;

<span class="kw">uint32_t</span> x = *q;
    </div>
  </div>

  <div class="callout warn">
    <div>
      Some MCUs cannot read 32-bit data from unaligned addresses.
      This may trigger HardFault.
    </div>
  </div>

  <div class="section-label">Pointers and strings</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>strings.c</span>
    </div>

    <div class="code-block">
<span class="kw">char</span> *msg = <span class="str">"HELLO"</span>;

<span class="kw">while</span>(*msg)
{
    msg++;
}
    </div>
  </div>

  <div class="callout">
    <div>
      Strings in C are character arrays ending with '\\0'.
    </div>
  </div>

  <div class="section-label">Dynamic memory (advanced)</div>

  <div class="code-wrap">
    <div class="code-bar">
      <div class="code-dots">
        <span class="code-dot"></span>
        <span class="code-dot"></span>
        <span class="code-dot"></span>
      </div>
      <span>malloc.c</span>
    </div>

    <div class="code-block">
<span class="kw">int</span> *p = malloc(<span class="num">10</span> * <span class="kw">sizeof</span>(<span class="kw">int</span>));

free(p);
    </div>
  </div>

  <div class="callout warn">
    <div>
      Most embedded systems avoid heavy dynamic allocation because of:
      fragmentation,
      unpredictable latency,
      memory leaks,
      allocation failure.
    </div>
  </div>

  <div class="section-label">Extremely important firmware patterns</div>

  <div class="card-grid">

    <div class="card">
      <h4>DMA buffers</h4>
      <p>
        Hardware directly writes into memory through pointers.
      </p>
    </div>

    <div class="card">
      <h4>Peripheral registers</h4>
      <p>
        Every peripheral is controlled using register pointers.
      </p>
    </div>

    <div class="card">
      <h4>ISR vector tables</h4>
      <p>
        Interrupt handlers are function pointers.
      </p>
    </div>

    <div class="card">
      <h4>Ring buffers</h4>
      <p>
        UART drivers heavily use pointer arithmetic.
      </p>
    </div>

    <div class="card">
      <h4>RTOS queues</h4>
      <p>
        Buffers and task communication use pointers everywhere.
      </p>
    </div>

    <div class="card">
      <h4>Driver APIs</h4>
      <p>
        Almost all embedded drivers expose pointer-based interfaces.
      </p>
    </div>

  </div>

  <div class="section-label">Golden rules</div>

  <div class="card-grid">

    <div class="card">
      <h4>Initialize pointers</h4>
      <p>Never leave pointers uninitialized.</p>
    </div>

    <div class="card">
      <h4>Think in addresses</h4>
      <p>Always visualize memory while debugging.</p>
    </div>

    <div class="card">
      <h4>Respect types</h4>
      <p>Pointer type determines arithmetic and access size.</p>
    </div>

    <div class="card">
      <h4>Use volatile properly</h4>
      <p>Mandatory for hardware registers.</p>
    </div>

    <div class="card">
      <h4>Check bounds</h4>
      <p>Prevent buffer overruns.</p>
    </div>

    <div class="card">
      <h4>Master arrays + pointers together</h4>
      <p>
        They are deeply connected in C.
      </p>
    </div>

  </div>

  <div class="callout">
    <div>
      If you deeply understand pointers,
      you unlock:
      embedded systems,
      operating systems,
      drivers,
      networking stacks,
      RTOS internals,
      DMA,
      bootloaders,
      kernels,
      and advanced C programming.
    </div>
  </div>
`;