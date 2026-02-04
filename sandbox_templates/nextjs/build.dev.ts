import "dotenv/config";
import { Template, defaultBuildLogger } from 'e2b'
import { template } from './template'

async function main() {
  await Template.build(template, 'assistly-dev', {
    onBuildLogs: defaultBuildLogger(),
    cpuCount: 4,
    memoryMB: 8192,
  });
}

main().catch(console.error);