# Entity Mapping and Description

| #  | Entity Label                  | Presidio Entity           | Description                                                                 |
|----|-------------------------------|----------------------------|-----------------------------------------------------------------------------|
| 1  | Person                        | `PERSON`                   | Name of an individual.                                                     |
| 2  | Name                          | `PERSON`                   | Same as Person.                                                            |
| 3  | Organization                  | *(Custom)*                | Name of a company, institution, or group.                                  |
| 4  | Phone Number                  | `PHONE_NUMBER`            | Any valid phone number format.                                             |
| 5  | Mobile Phone Number           | `PHONE_NUMBER`            | Mobile-specific phone number.                                              |
| 6  | Landline Phone Number         | `PHONE_NUMBER`            | Landline-specific phone number.                                            |
| 7  | Email                         | `EMAIL_ADDRESS`           | An email ID like `user@example.com`.                                       |
| 8  | Email Address                 | `EMAIL_ADDRESS`           | Same as Email.                                                             |
| 9  | Address                       | `LOCATION`                | Physical address, can include street, city, etc.                           |
| 10 | Location                      | `LOCATION`                | General geographical location.                                             |
| 11 | IP Address                    | `IP_ADDRESS`              | IPv4 or IPv6 address.                                                      |
| 12 | Passport Number               | `US_PASSPORT` / `IN_PASSPORT` | Government-issued passport number.                                   |
| 13 | Passport_Number               | `US_PASSPORT` / `IN_PASSPORT` | Same as above.                                                        |
| 14 | Passport Expiration Date      | `DATE_TIME`               | Date when a passport expires.                                              |
| 15 | Social Security Number        | `US_SSN` / `social_security_number` | US-issued government ID number.                                   |
| 16 | Social_Security_Number        | `US_SSN`                  | Same as above.                                                             |
| 17 | National ID Number            | `IN_AADHAAR` / `SG_NRIC_FIN` | Unique citizen identifier.                                           |
| 18 | Identity Card Number          | *(Custom)*                | Localized ID like driving license, Aadhaar, etc.                           |
| 19 | Identity Document Number      | *(Custom)*                | Broader term for passport, license, etc.                                   |
| 20 | National Health Insurance No. | `UK_NHS` / `IN_AADHAAR`   | ID from national health services.                                          |
| 21 | Health Insurance ID Number    | *(Custom)*                | Private or public insurance identifiers.                                   |
| 22 | Health Insurance Number       | *(Custom)*                | Same as above.                                                             |
| 23 | Insurance Number              | *(Custom)*                | Unique number provided by insurance provider.                              |
| 24 | Insurance Company             | *(Custom)*                | Name of the insurance provider.                                            |
| 25 | CVC / CVV                     | *(Custom)*                | Card Verification Code, 3-4 digits.                                        |
| 26 | Credit Card Number            | `CREDIT_CARD`             | A valid credit card number.                                                |
| 27 | Credit Card Expiration Date   | `DATE_TIME`               | Date when a credit card expires.                                           |
| 28 | Credit Card Brand             | *(Custom)*                | Brand of the card (Visa, MasterCard, etc.)                                 |
| 29 | Bank Account Number           | `US_BANK_NUMBER`          | Bank-specific account identifier.                                          |
| 30 | IBAN                          | `IBAN_CODE`               | International Bank Account Number.                                         |
| 31 | Transaction Number            | *(Custom)*                | Unique reference ID for a transaction.                                     |
| 32 | Tax Identification Number     | `US_ITIN` / `AU_TFN`      | Issued by tax authorities.                                                 |
| 33 | CPF                           | *(Custom - Brazil)*       | Brazilian taxpayer registry number.                                        |
| 34 | CNPJ                          | *(Custom - Brazil)*       | Brazilian national registry of legal entities.                             |
| 35 | PAN                           | `IN_PAN`                  | Indian tax identification number.                                          |
| 36 | Voter ID                      | `IN_VOTER`                | Indian voter identification number.                                        |
| 37 | Driver's License Number       | `US_DRIVER_LICENSE`       | Issued by transport authority.                                             |
| 38 | Vehicle Registration Number   | `IN_VEHICLE_REGISTRATION` | Government-registered vehicle ID.                                          |
| 39 | License Plate Number          | *(Custom)*                | Vehicle license plate.                                                     |
| 40 | AU Medicare                   | `AU_MEDICARE`             | Australian medical ID.                                                     |
| 41 | AU ABN                        | `AU_ABN`                  | Australian Business Number.                                                |
| 42 | AU ACN                        | `AU_ACN`                  | Australian Company Number.                                                 |
| 43 | AU TFN                        | `AU_TFN`                  | Australian Tax File Number.                                                |
| 44 | UK NINO                      | `UK_NINO`                 | UK National Insurance Number.                                              |
| 45 | UK NHS                       | `UK_NHS`                  | UK National Health Service number.                                         |
| 46 | SG NRIC/FIN                  | `SG_NRIC_FIN`             | Singapore citizen/resident ID.                                             |
| 47 | US ITIN                      | `US_ITIN`                 | U.S. Individual Taxpayer Identification Number.                            |
| 48 | Date of Birth                | `DATE_TIME`               | User’s birthday.                                                           |
| 49 | Medical License              | `MEDICAL_LICENSE`         | License number of medical professionals.                                   |
| 50 | Medical Condition            | *(Custom)*                | Any health-related diagnosis or illness.                                   |
| 51 | Medication                   | *(Custom)*                | Names of prescribed drugs.                                                 |
| 52 | URL                          | `URL`                     | Website links.                                                             |
| 53 | Social Media Handle          | *(Custom)*                | e.g., `@username` on Twitter, Instagram.                                   |
| 54 | Username                     | *(Custom)*                | Login/usernames for apps or services.                                      |
| 55 | Digital Signature            | *(Custom)*                | Cryptographic signature block or hash.                                     |
| 56 | Crypto Wallet Address        | `CRYPTO`                  | Blockchain or crypto wallet IDs.                                           |
| 57 | Serial Number                | *(Custom)*                | Hardware or software serial code.                                          |
| 58 | Reservation Number           | *(Custom)*                | ID for tickets, hotels, etc.                                               |
| 59 | Student ID Number            | *(Custom)*                | ID issued by school or university.                                         |
| 60 | Flight Number                | *(Custom)*                | Airline-specific code for a flight.                                        |
| 61 | Train Ticket Number          | *(Custom)*                | Code printed on train ticket.                                              |
| 62 | Birth Certificate Number     | *(Custom)*                | ID listed on birth certificate.                                            |
| 63 | NRP                          | `NRP`                     | Norwegian Personal Number.                                                 |
| 64 | UUID                          | *(Custom)*               | UUID v1 tp v5                                                |
| 65 | Cluster UUID                        | *(Custom)*                      | Cluster UUID                                                 |

---