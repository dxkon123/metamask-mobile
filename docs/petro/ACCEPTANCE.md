# Installed Android and Polygon acceptance record

Initial status: all WAL and POL requirements are **BLOCKED**, pending a compiled/installed APK and recorded execution. Source inspection and mocked tests never establish a PASS for real wallet or chain behavior.

## WAL requirements

| ID | Required evidence |
| --- | --- |
| WAL-001 | Fresh wallet, phrase generation verified privately, address/account, lock/unlock and process restart persistence. Never capture the phrase. |
| WAL-002 | Fresh disposable test phrase/private-key import privately, expected public address, lock/restart persistence. Never record private material. |
| WAL-003 | Multiple derived addresses, account selection, same phrase recovered privately into a fresh test installation. |
| WAL-004 | Original export UI, required reauthentication, selected-account public address, secret redaction; review logs/network destinations without capturing/transmitting the key. |
| WAL-005 | User-approved minimal Polygon POL send, chain ID 137 (`0x89`), public hash and successful receipt, recipient/balance reconciliation. |
| WAL-006 | User-approved incoming Polygon transfer, public hash and receipt, balance and history after confirmation/restart. |
| WAL-007 | Original browser and injection; QuickSwap connection, origin permissions, public wallet address, chain detection/switching, quote, original confirmation UI, explicit approval, completed real swap, receipt and balance reconciliation. |

## POL requirements

| ID | Required evidence |
| --- | --- |
| POL-001 | Polygon Mainnet selected; live provider reports chain ID 137. |
| POL-002 | POL balance matches an independent live chain query. |
| POL-003 | Approved POL send and successful on-chain receipt. |
| POL-004 | Confirmed incoming POL transfer and reflected balance. |
| POL-005 | Supported Polygon tokens displayed with correct chain/address/decimals. |
| POL-006 | Approved ERC-20 transfer, receipt and Transfer event/balances. |
| POL-007 | Real Polygon DApp connects through original browser with reviewed permissions. |
| POL-008 | Original DApp confirmation UI, explicit user consent, signing and receipt. |
| POL-009 | Genuine approved QuickSwap swap, receipt, token deltas and gas reconciliation. |
| POL-010 | Wallet history matches public transaction hashes and confirmed chain state. |

## QuickSwap execution gate

Use `https://quickswap.exchange` in the original MetaMask Browser on Polygon Mainnet. A loaded site, wallet connection or quote alone is insufficient. Record public address, chain ID, chosen supported pair, minimal amount, quoted output, spender/contract, allowance if required, slippage, gas and the wallet confirmation details. Keep the swap and any approval **BLOCKED** until the user explicitly approves the concrete transaction(s). After approval, sign through the original interface, broadcast, verify the public hash/receipt on `https://polygonscan.com`, and reconcile actual token/POL balances. A failed/reverted transaction is not a swap PASS.

Only newly generated disposable test wallets may be used. Production wallets are prohibited. Wallet funding, approvals, sends, swaps and any other operation involving real funds require explicit user authorization. Do not fabricate a test hash. Do not store phrases, keys, wallet passwords, sensitive screenshots or unredacted device logs in GitHub or the delivery bundle.

For each execution record: status (PASS/FAIL/BLOCKED/NOT RUN), APK SHA-256, source commit, device/emulator model and Android version, test time, observed result, non-secret evidence, transaction approval reference and public chain hashes where applicable. Regression remains pending for the full inventory until appropriate suites/device workflows run. Production release remains blocked on all acceptance and security gates, separate signing, and resolution of critical findings.
