import { Template, waitForTimeout } from 'e2b'

export const template = Template()
.fromDockerfile("./e2b.Dockerfile")
.setStartCmd("/compile_page.sh", waitForTimeout(30_000))