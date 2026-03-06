<template>
  <!-- Spider Web SVG corner decorations -->
  <div
    class="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Top-left web -->
    <svg
      class="absolute top-0 left-0 opacity-10 dark:opacity-20 w-48 h-48"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g
        stroke="currentColor"
        stroke-width="1.5"
      >
        <!-- Radial lines from corner -->
        <line
          x1="0"
          y1="0"
          x2="200"
          y2="60"
        />
        <line
          x1="0"
          y1="0"
          x2="150"
          y2="120"
        />
        <line
          x1="0"
          y1="0"
          x2="80"
          y2="200"
        />
        <line
          x1="0"
          y1="0"
          x2="200"
          y2="10"
        />
        <line
          x1="0"
          y1="0"
          x2="10"
          y2="200"
        />
        <!-- Concentric arcs -->
        <path d="M 50,0 Q 25,25 0,50" />
        <path d="M 100,0 Q 50,50 0,100" />
        <path d="M 150,0 Q 75,75 0,150" />
        <path d="M 200,0 Q 100,100 0,200" />
      </g>
    </svg>

    <!-- Top-right web -->
    <svg
      class="absolute top-0 right-0 opacity-10 dark:opacity-20 w-48 h-48"
      viewBox="0 0 200 200"
      fill="none"
    >
      <g
        stroke="currentColor"
        stroke-width="1.5"
      >
        <line
          x1="200"
          y1="0"
          x2="0"
          y2="60"
        />
        <line
          x1="200"
          y1="0"
          x2="50"
          y2="120"
        />
        <line
          x1="200"
          y1="0"
          x2="120"
          y2="200"
        />
        <line
          x1="200"
          y1="0"
          x2="0"
          y2="10"
        />
        <line
          x1="200"
          y1="0"
          x2="190"
          y2="200"
        />
        <path d="M 150,0 Q 175,25 200,50" />
        <path d="M 100,0 Q 150,50 200,100" />
        <path d="M 50,0 Q 125,75 200,150" />
        <path d="M 0,0 Q 100,100 200,200" />
      </g>
    </svg>
  </div>
</template>
