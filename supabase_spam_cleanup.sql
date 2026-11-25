-- Remove spam sign-ups (Turkish gambling spam in the "name" field).
-- Run in Supabase Dashboard > SQL Editor, ONE STEP AT A TIME.
-- Only targets accounts that never verified their email and have no orders.

-- STEP 1: Preview. Check the count and eyeball the sample before deleting.
SELECT count(*) AS spam_users
FROM "User" u
WHERE u."emailVerified" IS NULL
  AND u.role = 'CUSTOMER'
  AND (u.name ILIKE '%bedava%' OR u.name ILIKE '%tıkla%' OR u.name ILIKE '%kazan%'
       OR u.name ~ '[0-9]' OR u.name ~ 'https?://|www\.|\.com')
  AND NOT EXISTS (SELECT 1 FROM "Order" o WHERE o."userId" = u.id);

SELECT u.id, u.name, u.email, u."createdAt"
FROM "User" u
WHERE u."emailVerified" IS NULL
  AND u.role = 'CUSTOMER'
  AND (u.name ILIKE '%bedava%' OR u.name ILIKE '%tıkla%' OR u.name ILIKE '%kazan%'
       OR u.name ~ '[0-9]' OR u.name ~ 'https?://|www\.|\.com')
  AND NOT EXISTS (SELECT 1 FROM "Order" o WHERE o."userId" = u.id)
ORDER BY u."createdAt" DESC
LIMIT 50;

-- Also check: did the bots create any ADMINs? (Expect only your own accounts.)
SELECT id, name, email, "createdAt" FROM "User" WHERE role = 'ADMIN';

-- STEP 2: Delete (related rows cascade automatically).
BEGIN;

DELETE FROM "VerificationToken" vt
USING "User" u
WHERE vt.identifier = 'verify:' || u.email
  AND u."emailVerified" IS NULL
  AND u.role = 'CUSTOMER'
  AND (u.name ILIKE '%bedava%' OR u.name ILIKE '%tıkla%' OR u.name ILIKE '%kazan%'
       OR u.name ~ '[0-9]' OR u.name ~ 'https?://|www\.|\.com')
  AND NOT EXISTS (SELECT 1 FROM "Order" o WHERE o."userId" = u.id);

DELETE FROM "User" u
WHERE u."emailVerified" IS NULL
  AND u.role = 'CUSTOMER'
  AND (u.name ILIKE '%bedava%' OR u.name ILIKE '%tıkla%' OR u.name ILIKE '%kazan%'
       OR u.name ~ '[0-9]' OR u.name ~ 'https?://|www\.|\.com')
  AND NOT EXISTS (SELECT 1 FROM "Order" o WHERE o."userId" = u.id);

COMMIT;
