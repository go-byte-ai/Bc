import { Chunk } from './Chunk.js';

export class WorldManager {
  constructor(scene) {
    this.scene = scene;
    this.chunks = new Map();
  }

  key(x,z) {
    return `${x},${z}`;
  }

  loadChunk(x,z) {
    const k = this.key(x,z);
    if (this.chunks.has(k)) return;

    const chunk = new Chunk(x,z);
    chunk.generate();
    const mesh = chunk.buildMesh();
    this.scene.add(mesh);
    this.chunks.set(k, chunk);
  }

  initDemoZone() {
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        this.loadChunk(x,z);
      }
    }
  }
}
