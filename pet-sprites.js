// =============================================
// PET SPRITES — pixel art drawing library
// Scale: 3 CSS px per logical pixel
// Sprite bounding box: 16 wide × 22 tall (logical)
// =============================================

const S = 3; // scale

function r(ctx, x, y, w, h, c) {
  if (!c || c === '.') return;
  ctx.fillStyle = c;
  ctx.fillRect(x * S, y * S, w * S, h * S);
}

function border(ctx, x, y, w, h, c) {
  r(ctx, x,       y,       w, 1, c);
  r(ctx, x,       y+h-1,   w, 1, c);
  r(ctx, x,       y,       1, h, c);
  r(ctx, x+w-1,   y,       1, h, c);
}

// ── EGG ─────────────────────────────────────
function drawEgg(ctx, ox, oy, cracked) {
  const B = '#222', E = '#f2e4c8', P = '#d9c9a0';
  // body
  r(ctx, ox+2, oy+1,  8, 11, E);
  r(ctx, ox+1, oy+3,  10, 7, E);
  r(ctx, ox+3, oy,    6,  1, E);
  r(ctx, ox+3, oy+12, 6,  1, E);
  // outline
  r(ctx, ox+3, oy,    6, 1, B);
  r(ctx, ox+2, oy+1,  1, 1, B); r(ctx, ox+9, oy+1,  1, 1, B);
  r(ctx, ox+1, oy+2,  1, 1, B); r(ctx, ox+10,oy+2,  1, 1, B);
  r(ctx, ox+1, oy+3,  1, 7, B); r(ctx, ox+10,oy+3,  1, 7, B);
  r(ctx, ox+1, oy+10, 1, 1, B); r(ctx, ox+10,oy+10, 1, 1, B);
  r(ctx, ox+2, oy+11, 1, 1, B); r(ctx, ox+9, oy+11, 1, 1, B);
  r(ctx, ox+3, oy+12, 6, 1, B);
  // spots
  r(ctx, ox+3, oy+3, 2, 2, P);
  r(ctx, ox+7, oy+5, 2, 1, P);
  r(ctx, ox+4, oy+8, 3, 1, P);
  // crack
  if (cracked) {
    r(ctx, ox+5, oy+1, 1, 1, '#ffe080');
    r(ctx, ox+6, oy+2, 1, 1, '#ffe080');
    r(ctx, ox+5, oy+3, 2, 1, '#ffe080');
  }
}

// ── DOG ─────────────────────────────────────
// Colors
const DOG = {
  tan:  '#c68642', dark: '#7B4B2A', lite: '#e8b87c',
  nose: '#ff8888', blk: '#1a1a1a', wht: '#ffffff',
  blue: '#4a9eff', gold: '#ffd700',
};

function drawDog(ctx, ox, oy, stage) {
  if (stage === 0) { drawEgg(ctx, ox+1, oy, false); return; }
  const {tan, dark, lite, nose, blk, wht, blue, gold} = DOG;

  if (stage === 1) {
    // BABY: big head, stubby body
    r(ctx, ox+0, oy+3, 3, 7, dark);          // left ear
    r(ctx, ox+13,oy+3, 3, 7, dark);          // right ear
    r(ctx, ox+2, oy+1, 12,10, tan);          // head
    border(ctx, ox+2, oy+1, 12,10, blk);
    r(ctx, ox+4, oy+4, 2, 2, blk);           // left eye
    r(ctx, ox+4, oy+4, 1, 1, wht);
    r(ctx, ox+10,oy+4, 2, 2, blk);           // right eye
    r(ctx, ox+10,oy+4, 1, 1, wht);
    r(ctx, ox+4, oy+7, 8, 4, lite);          // muzzle
    r(ctx, ox+7, oy+7, 2, 2, nose);          // nose
    // stubby feet
    r(ctx, ox+4, oy+11,3, 2, tan);
    r(ctx, ox+9, oy+11,3, 2, tan);
    return;
  }

  // TEEN / ADULT / EVOLVED
  const big = stage >= 3;

  r(ctx, ox+0, oy+2, 3, big?9:7, dark);     // left ear
  r(ctx, ox+13,oy+2, 3, big?9:7, dark);     // right ear
  r(ctx, ox+2, oy+0, 12,11, tan);            // head
  border(ctx, ox+2, oy+0, 12,11, blk);
  r(ctx, ox+4, oy+3, 2, 2, blk);            // left eye
  r(ctx, ox+4, oy+3, 1, 1, wht);
  r(ctx, ox+10,oy+3, 2, 2, blk);            // right eye
  r(ctx, ox+10,oy+3, 1, 1, wht);
  r(ctx, ox+4, oy+7, 8, 4, lite);           // muzzle
  r(ctx, ox+7, oy+7, 2, 2, nose);           // nose

  if (stage === 2) {
    // TEEN: small body
    r(ctx, ox+4, oy+11,8, 5, tan);
    border(ctx, ox+4, oy+11,8, 5, blk);
    r(ctx, ox+4, oy+16,2, 3, tan); r(ctx, ox+10,oy+16,2, 3, tan);
    border(ctx, ox+4, oy+16,2, 3, blk); border(ctx, ox+10,oy+16,2, 3, blk);
    return;
  }

  // ADULT body
  r(ctx, ox+3, oy+11,10, 6, tan);
  border(ctx, ox+3, oy+11,10, 6, blk);
  // legs
  r(ctx, ox+4, oy+17,2, 4, tan); border(ctx, ox+4, oy+17,2, 4, blk);
  r(ctx, ox+10,oy+17,2, 4, tan); border(ctx, ox+10,oy+17,2, 4, blk);
  // tail
  r(ctx, ox+13,oy+10,2, 4, tan);
  r(ctx, ox+14,oy+8, 2, 3, tan);

  if (stage === 4) {
    // EVOLVED: blue collar + gold tag
    r(ctx, ox+3, oy+11,10, 2, blue);
    r(ctx, ox+7, oy+11,2, 3, gold);
    border(ctx, ox+7, oy+11,2, 3, blk);
  }
}

// ── CAT ─────────────────────────────────────
const CAT = {
  orn: '#e08030', dark: '#b05818', lite: '#f0c070',
  nose: '#ff8888', blk: '#1a1a1a', wht: '#ffffff',
  grn: '#55cc66', pnk: '#ffaaaa', bow: '#ff6699',
};

function drawCat(ctx, ox, oy, stage) {
  if (stage === 0) { drawEgg(ctx, ox+1, oy, false); return; }
  const {orn, dark, lite, nose, blk, wht, grn, pnk, bow} = CAT;

  if (stage === 1) {
    // BABY CAT
    // pointy ears
    r(ctx, ox+2, oy+0, 3, 2, orn); r(ctx, ox+3, oy-1,1, 1, orn);
    r(ctx, ox+11,oy+0, 3, 2, orn); r(ctx, ox+12,oy-1,1, 1, orn);
    r(ctx, ox+3, oy+0, 1, 2, pnk); r(ctx, ox+12,oy+0,1, 2, pnk);
    // head
    r(ctx, ox+2, oy+1,12,10, orn);
    border(ctx, ox+2, oy+1,12,10, blk);
    // eyes
    r(ctx, ox+4, oy+4, 3, 2, grn); r(ctx, ox+5,oy+4,1,2,blk);
    r(ctx, ox+9, oy+4, 3, 2, grn); r(ctx, ox+10,oy+4,1,2,blk);
    r(ctx, ox+4, oy+4, 1, 1, wht); r(ctx, ox+9,oy+4,1,1,wht);
    // nose
    r(ctx, ox+7, oy+7, 2, 2, nose);
    // whiskers
    r(ctx, ox+0, oy+8, 3, 1, blk); r(ctx, ox+13,oy+8,3,1,blk);
    // feet
    r(ctx, ox+4, oy+11,3, 2, orn); r(ctx, ox+9,oy+11,3,2,orn);
    return;
  }

  // Pointy ears
  r(ctx, ox+2, oy+0, 3, 3, orn); r(ctx, ox+3, oy-1,1, 1, orn);
  r(ctx, ox+11,oy+0, 3, 3, orn); r(ctx, ox+12,oy-1,1, 1, orn);
  r(ctx, ox+3, oy+0, 1, 3, pnk); r(ctx, ox+12,oy+0,1, 3, pnk);
  r(ctx, ox+2, oy-1, 1, 1, blk); r(ctx, ox+13,oy-1,1, 1, blk); // ear outlines
  // head
  r(ctx, ox+2, oy+1,12,10, orn);
  border(ctx, ox+2, oy+1,12,10, blk);
  // forehead stripes
  r(ctx, ox+5, oy+1, 1, 3, dark);
  r(ctx, ox+8, oy+1, 1, 3, dark);
  r(ctx, ox+11,oy+1, 1, 3, dark);
  // eyes
  r(ctx, ox+4, oy+4, 3, 2, grn); r(ctx, ox+5,oy+4,1,2,blk);
  r(ctx, ox+9, oy+4, 3, 2, grn); r(ctx, ox+10,oy+4,1,2,blk);
  r(ctx, ox+4, oy+4, 1, 1, wht); r(ctx, ox+9,oy+4,1,1,wht);
  // nose + mouth
  r(ctx, ox+7, oy+7, 2, 2, nose);
  r(ctx, ox+6, oy+9, 1, 1, blk); r(ctx, ox+9,oy+9,1,1,blk);
  // whiskers
  r(ctx, ox+0, oy+8, 3, 1, blk); r(ctx, ox+13,oy+8,3,1,blk);
  r(ctx, ox+0, oy+9, 2, 1, blk); r(ctx, ox+14,oy+9,2,1,blk);

  if (stage === 2) {
    // TEEN body
    r(ctx, ox+4, oy+11,8, 5, orn);
    border(ctx, ox+4, oy+11,8, 5, blk);
    r(ctx, ox+12,oy+13,2, 4, orn); // tail
    r(ctx, ox+4, oy+16,2, 3, orn); r(ctx, ox+10,oy+16,2,3,orn);
    border(ctx, ox+4, oy+16,2, 3, blk); border(ctx, ox+10,oy+16,2,3,blk);
    return;
  }

  // ADULT / EVOLVED body
  r(ctx, ox+4, oy+11,8, 7, orn);
  border(ctx, ox+4, oy+11,8, 7, blk);
  r(ctx, ox+6, oy+11,1, 7, dark); r(ctx, ox+10,oy+11,1,7,dark); // stripes
  // legs
  r(ctx, ox+4, oy+18,2, 4, orn); border(ctx, ox+4, oy+18,2,4,blk);
  r(ctx, ox+10,oy+18,2, 4, orn); border(ctx, ox+10,oy+18,2,4,blk);
  // long tail
  r(ctx, ox+12,oy+13,2, 7, orn);
  r(ctx, ox+13,oy+11,2, 3, orn);
  r(ctx, ox+12,oy+19,3, 2, orn); border(ctx, ox+12,oy+19,3,2,blk); // tail tip

  if (stage === 4) {
    // EVOLVED: bow on head
    r(ctx, ox+4, oy-2,2, 2, bow);
    r(ctx, ox+10,oy-2,2, 2, bow);
    r(ctx, ox+6, oy-1,4, 2, '#ff3377');
    r(ctx, ox+7, oy-2,2, 1, '#ff3377');
  }
}

// ── BEAR ────────────────────────────────────
const BEAR = {
  brn: '#8B5A2B', dark: '#5C3317', lite: '#c49a6c',
  snt: '#d4a47a', blk: '#1a1a1a', wht: '#ffffff',
  pnk: '#ffb3c6', yel: '#cc8800',
};

function drawBear(ctx, ox, oy, stage) {
  if (stage === 0) { drawEgg(ctx, ox+1, oy, false); return; }
  const {brn, dark, lite, snt, blk, wht, pnk, yel} = BEAR;

  if (stage === 1) {
    // BABY BEAR: giant round head
    r(ctx, ox+1, oy+0, 4, 3, brn); r(ctx, ox+2,oy+1,2,2,pnk); // L ear
    r(ctx, ox+11,oy+0, 4, 3, brn); r(ctx, ox+12,oy+1,2,2,pnk);// R ear
    r(ctx, ox+1, oy+2,14,11, brn);                              // big head
    border(ctx, ox+1, oy+2,14,11, blk);
    r(ctx, ox+4, oy+8, 8, 4, snt);                              // snout
    r(ctx, ox+3, oy+5, 2, 2, blk); r(ctx, ox+3,oy+5,1,1,wht); // L eye
    r(ctx, ox+11,oy+5, 2, 2, blk); r(ctx, ox+11,oy+5,1,1,wht);// R eye
    r(ctx, ox+7, oy+8, 2, 2, dark);                             // nose
    // stubby feet
    r(ctx, ox+3, oy+13,3, 2, brn); r(ctx, ox+10,oy+13,3,2,brn);
    return;
  }

  // TEEN / ADULT / EVOLVED
  // ears
  r(ctx, ox+1, oy+0, 4, 3, brn); r(ctx, ox+2,oy+1,2,2,pnk);
  r(ctx, ox+11,oy+0, 4, 3, brn); r(ctx, ox+12,oy+1,2,2,pnk);
  border(ctx, ox+1, oy+0, 4, 3, blk);
  border(ctx, ox+11,oy+0, 4, 3, blk);
  // head
  r(ctx, ox+1, oy+2,14,11, brn);
  border(ctx, ox+1, oy+2,14,11, blk);
  // snout
  r(ctx, ox+4, oy+8, 8, 5, snt);
  // eyes
  r(ctx, ox+3, oy+5, 2, 2, blk); r(ctx, ox+3,oy+5,1,1,wht);
  r(ctx, ox+11,oy+5, 2, 2, blk); r(ctx, ox+11,oy+5,1,1,wht);
  // nose
  r(ctx, ox+7, oy+8, 2, 2, dark);

  if (stage === 2) {
    // TEEN body (round)
    r(ctx, ox+3, oy+13,10, 6, brn);
    border(ctx, ox+3, oy+13,10, 6, blk);
    r(ctx, ox+5, oy+14,6, 4, lite); // belly
    r(ctx, ox+3, oy+19,3, 2, brn); r(ctx, ox+10,oy+19,3,2,brn);
    return;
  }

  // ADULT body (chubby)
  r(ctx, ox+2, oy+13,12, 7, brn);
  border(ctx, ox+2, oy+13,12, 7, blk);
  r(ctx, ox+4, oy+14,8, 5, lite); // belly
  // arms (stubby)
  r(ctx, ox+0, oy+14,2, 4, brn); border(ctx, ox+0,oy+14,2,4,blk);
  r(ctx, ox+14,oy+14,2, 4, brn); border(ctx, ox+14,oy+14,2,4,blk);
  // legs
  r(ctx, ox+3, oy+20,3, 3, brn); border(ctx, ox+3,oy+20,3,3,blk);
  r(ctx, ox+10,oy+20,3, 3, brn); border(ctx, ox+10,oy+20,3,3,blk);

  if (stage === 4) {
    // EVOLVED: honey pot in left arm
    r(ctx, ox+0, oy+16,4, 5, yel);
    r(ctx, ox+1, oy+15,2, 1, yel);
    border(ctx, ox+0,oy+16,4,5,blk);
    r(ctx, ox+1, oy+15,2, 1, blk);
    // H label
    r(ctx, ox+1, oy+17,1, 3, wht);
    r(ctx, ox+2, oy+18,1, 1, wht);
    r(ctx, ox+3, oy+17,1, 3, wht);
  }
}

// ── DISPATCHER ──────────────────────────────
function drawPet(ctx, ox, oy, type, stage) {
  ctx.imageSmoothingEnabled = false;
  if (type === 'dog')  drawDog(ctx, ox, oy, stage);
  else if (type === 'cat')  drawCat(ctx, ox, oy, stage);
  else if (type === 'bear') drawBear(ctx, ox, oy, stage);
  else drawEgg(ctx, ox+1, oy, stage > 0);
}
