import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const SIZE = 16;

export class Chunk {
  constructor(x, z) {
    this.x = x;
    this.z = z;
    this.blocks = new Uint8Array(SIZE * SIZE * SIZE);
    this.mesh = null;
  }

  index(x, y, z) {
    return x + SIZE * (y + SIZE * z);
  }

  generate() {
    for (let x = 0; x < SIZE; x++) {
      for (let z = 0; z < SIZE; z++) {
        const height = Math.floor(4 + Math.sin((this.x + x) * 0.2) * 2);
        for (let y = 0; y < height; y++) {
          this.blocks[this.index(x, y, z)] = 1;
        }
      }
    }
  }

  buildMesh() {
    const geo = new THREE.BoxGeometry(1,1,1);
    const mat = new THREE.MeshStandardMaterial({ color: 0x55aa55 });
    const group = new THREE.Group();

    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        for (let z = 0; z < SIZE; z++) {
          if (this.blocks[this.index(x,y,z)]) {
            const block = new THREE.Mesh(geo, mat);
            block.position.set(
              this.x * SIZE + x,
              y,
              this.z * SIZE + z
            );
            group.add(block);
          }
        }
      }
    }

    this.mesh = group;
    return group;
  }
}
