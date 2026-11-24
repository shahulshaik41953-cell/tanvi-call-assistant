# Tanvi Call Assistant

Missed-call recovery and WhatsApp follow-up for Tanvi Gastro & Skin Clinic.

## Objective

When a patient calls the clinic's existing Android mobile number and the call is not answered:

1. Detect and record the missed call on the clinic's Android device.
2. Apply the clinic schedule: Sunday closed; Monday–Saturday open.
3. Send an approved WhatsApp template using the official Meta WhatsApp Business Platform, only where the caller has provided valid WhatsApp opt-in.
4. Receive patient replies through the WhatsApp webhook.
5. Send one automatic acknowledgement and save the enquiry for staff follow-up.

## Clinic message behaviour

### Sunday
Initial message: explain that the clinic is closed on Sunday, ask the patient to share the purpose of the call, and say the team will contact them on Monday.

After the patient's first reply: acknowledge receipt and confirm that the team will review and respond on Monday.

### Monday–Saturday
Initial message: explain that the call could not be answered, ask the patient to share the purpose of the call, and say the team will get back shortly.

After the patient's first reply: acknowledge receipt and say the team will respond as soon as possible.

The system must not provide medical advice or promise an appointment confirmation.

## Non-negotiable constraints

- No cloud telephony, virtual number, call forwarding service, or external call-routing platform.
- Preserve the clinic's existing mobile number and normal calling experience.
- WhatsApp messages must use official Meta APIs, approved templates where required, and valid opt-in. A missed call alone is not WhatsApp opt-in.
- Verify whether the clinic's current WhatsApp Business number supports Meta's app/API coexistence before onboarding. Do not migrate or disconnect the existing account without explicit clinic approval.
- Android call-state detection and caller-number access are separate capabilities. Validate on the actual clinic phone and Android version before committing to a production design.
- Do not assume an ordinary background app can access restricted call-log data. Avoid replacing the default dialer unless the clinic explicitly approves a validated alternative.
- The clinic's normal calling must continue if the app, internet, Firebase, or WhatsApp API is unavailable.
- Collect only necessary patient information. Restrict staff access and define a retention/deletion policy.
- Never commit tokens, service-account keys, patient phone numbers, call logs, or health information.

## Planned architecture

- Android application: Kotlin; call-state detection prototype; local event queue.
- Backend: Firebase Cloud Functions.
- Database: Cloud Firestore.
- Messaging: Meta WhatsApp Business Platform Cloud API and inbound webhooks.
- Dashboard: React, for missed calls, enquiries, delivery states and Monday follow-up.
- Secrets: Firebase Secret Manager.
- Reliability: idempotent event processing, retries with limits, delivery status tracking, and an offline-safe local queue.

## Suggested Firestore collections

- `settings/clinic`: opening hours, timezone and enabled automation rules.
- `calls/{callId}`: event time, caller identifier, call outcome and processing state.
- `consents/{consentId}`: opt-in evidence, source, timestamp and revocation status.
- `conversations/{conversationId}`: WhatsApp contact and conversation state.
- `messages/{messageId}`: template, delivery state, provider message ID and timestamps.
- `enquiries/{enquiryId}`: patient-provided purpose, follow-up status and assigned staff member.

Do not store detailed clinical history in this communication workflow.

## Milestones

1. **Feasibility:** obtain clinic phone model, Android version, SIM/network and WhatsApp Business setup details.
2. **Android proof of concept:** test ringing/off-hook/idle transitions and distinguish answered from unanswered calls; validate caller-number access without replacing the dialer.
3. **Firebase foundation:** set up development project, authentication, Firestore rules, Functions and App Check.
4. **WhatsApp onboarding:** verify number eligibility/coexistence, opt-in method, approved templates and webhook subscriptions.
5. **Automation:** implement Sunday/weekday messages, first-reply acknowledgement, duplicate suppression and delivery/retry handling.
6. **Dashboard:** build staff follow-up queue and audit trail.
7. **End-to-end tests:** real-device tests, API failures, offline periods, duplicate events, revoked opt-in and clinic-hours boundaries.
8. **Deployment:** written clinic approval, privacy notice, staff handover and rollback procedure.

## Current status

Planning. No production call detection, WhatsApp messaging or patient-data collection is active.

## Cost note

The previously discussed ₹300–₹500/month is a planning allowance, not a verified quote. Actual WhatsApp, Firebase and any applicable taxes/usage charges must be checked before deployment.
