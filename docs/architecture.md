# System Architecture

## Event flow

1. Android device observes a completed call-state sequence and classifies an unanswered incoming call using a validated implementation.
2. Local event is assigned a stable ID and queued.
3. App authenticates to Firebase and submits the event.
4. Cloud Function validates the event, schedule, consent record and idempotency key.
5. If eligible, Cloud Function sends the approved WhatsApp template through Meta Graph API using a secret-managed token.
6. Meta delivery/read/status webhooks update message state.
7. Patient replies arrive through the WhatsApp webhook.
8. Cloud Function records the reply and sends one acknowledgement according to the conversation state.
9. Dashboard displays the enquiry for staff follow-up.

## Critical technical gates

- Do not rely on undocumented Android behaviour. Phone-state observation does not automatically grant access to the caller number.
- Confirm Google Play policy implications before any public distribution. Initial distribution may be private/sideloaded only if permitted by the clinic and device owner.
- WhatsApp Business App/API coexistence must be confirmed for the clinic's exact account and number.
- The initial outbound WhatsApp notification requires valid opt-in and an approved template if it is business-initiated outside the customer-service window.
- The first acknowledgement after a user reply should occur inside the applicable customer-service window. Later business-initiated messages follow template rules.
- All webhook handlers must verify signatures, tolerate retries and be idempotent.

## Schedule configuration

Use `Asia/Kolkata` as the clinic timezone. Store opening hours in configuration, not in hard-coded conditionals. Sunday is closed; Monday–Saturday schedule and holidays should be confirmed by the clinic.

## Privacy and reliability

- Keep phone numbers and enquiry data out of logs.
- Apply least-privilege Firestore security rules.
- Store API credentials only in Secret Manager.
- Maintain consent evidence and honour opt-out/revocation.
- Use a retention policy approved by the clinic.
- Keep a local queue on Android so temporary network failures do not silently drop events.
- Never block or alter the clinic's normal incoming/outgoing calling path.
