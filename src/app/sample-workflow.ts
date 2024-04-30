export class WorflowSample {

  public static sample2 = [
    {
      "startState": "NEW",
      "event": "CREATE",
      "endStateOne": {
        "stateName": "Payment Pending",
        "stateCode": "PAYMENT_PENDING",
        "nextEvent": null,
        "breakingAction": {
          "actionType": "BILL_ID_GENERATION",
          "args": null
        },
        "nonBreakingActionList": [
          { 
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
                "notificationTitle": "Demande soumise"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
                "emailTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
                "notificationTitle": "Application submitted"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "emailTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "notificationTitle": "Dosiye yoherejwe"
              }
            }
          },
          {
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
                "notificationTitle": "Demande soumise"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
                "emailTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
                "notificationTitle": "Application submitted"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "emailTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "notificationTitle": "Dosiye yoherejwe"
              }
            }
          },
          {
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été soumise avec succès! Frais à payer: 10,000 FRW, Payez avant: ${paymentExpiryDate} For support, call 9099",
                "notificationTitle": "Demande soumise"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
                "emailTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully submitted! Fees to be paid: 10,000 RWF, Pay Before: ${paymentExpiryDate}. For support, call 9099",
                "notificationTitle": "Application submitted"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "emailTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yoherejwe neza! Amafaranga yishyurwa: 10,000 FRW Ishyura mbere ya: ${paymentExpiryDate}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "notificationTitle": "Dosiye yoherejwe"
              }
            }
          },
        ]
      },
      "endStateTwo": null
    },
    {
      "startState": "PAYMENT_PENDING",
      "event": "PAY",
      "endStateOne": {
        "stateName": "Paid",
        "stateCode": "PAID",
        "nextEvent": "PUSH",
        "breakingAction": null,
        "nonBreakingActionList": [
          {
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été payée avec succès! Vous pouvez suivre votre demande avec les détails suivants: Numéro de demande: ${applicationNumber} Frais payés: ${feeAmount} ${currency}",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation ${billId} a été payée avec succès! Vous pouvez suivre votre demande avec les détails suivants: Numéro de demande: ${applicationNumber} Frais payés: ${feeAmount} ${currency}",
                "notificationTitle": "Paiement effectué - ${applicationNumber}"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully paid! You can track your application with the following details: Application number: ${applicationNumber} Fees paid: ${feeAmount} ${currency}",
                "emailTemplate": "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully paid! You can track your application with the following details: Application number: ${applicationNumber} Fees paid: ${feeAmount} ${currency}",
                "notificationTitle": "Payment Successful - ${applicationNumber}"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yishyuwe neza! Kurikirana dosiye yawe ukoresheje aya makuru: Nomero ya dosiye: ${applicationNumber} Amafaranga yishyuwe: ${feeAmount} ${currency}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "emailTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yishyuwe neza! Kurikirana dosiye yawe ukoresheje aya makuru: Nomero ya dosiye: ${applicationNumber} Amafaranga yishyuwe: ${feeAmount} ${currency}. Mukeneye ubundi bufasha, mwahamagara 9099",
                "notificationTitle": "Kwishyura byakozwe"
              }
            }
          }
        ]
      },
      "endStateTwo": null
    },
    {
      "startState": "PAID",
      "event": "PUSH",
      "endStateOne": {
        "stateName": "Pending approval",
        "stateCode": "PENDING_APPROVAL",
        "nextEvent": null,
        "breakingAction": {
          "actionType": "INTEGRATION",
          "args": {
            "target": "DGIE",
            "serviceName": "RWANDAN_NATIONALITY_ACQUISITION_BY_ADOPTION"
          }
        },
        "nonBreakingActionList": null
      },
      "endStateTwo": null
    },
    {
      "startState": "PENDING_APPROVAL",
      "event": "FINAL_APPROVE",
      "endStateOne": {
        "stateName": "Approved",
        "stateCode": "CLOSED_WITH_APPROVAL",
        "nextEvent": null,
        "breakingAction": null,
        "nonBreakingActionList": [
          {
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Demande approuvée"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with application number ${applicationNumber} has been successfully approved! Please go to DGIE for your oath taking and collection of nationality certificate on ${paymentExpiryDate}.",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Application approved"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite nomero ya dosiye ${applicationNumber} yemejwe! Usabwe kugana DGIE mu muhango wo kurahira no kwakira icyemezo cyawe cy’ubwenegihugu ku ya  ${paymentExpiryDate}.",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Dosiye yemejwe"
              }
            }
          }
        ]
      },
      "endStateTwo": null
    },
    {
      "startState": "PENDING_APPROVAL",
      "event": "REJECT",
      "endStateOne": {
        "stateName": "Rejected",
        "stateCode": "CLOSED_WITH_REJECTED",
        "nextEvent": null,
        "breakingAction": null,
        "nonBreakingActionList": [
          {
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été rejetée!\n ${paymentExpiryDate}",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Demande rejetée"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with application number ${applicationNumber} has been rejected! \n ${paymentExpiryDate}.",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Application rejected"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw’u Rwanda binyuze mu kurera ifite nomero ya dosiye ${applicationNumber} ntiyemejwe! \n ${paymentExpiryDate}",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Dosiye ntiyemejwe"
              }
            }
          }
        ]
      },
      "endStateTwo": null
    },
    {
      "event": "REQUEST_FOR_ACTION",
      "startState": "PENDING_APPROVAL",
      "endStateOne": {
        "stateName": "Pending resubmission",
        "stateCode": "PENDING_RESUBMISSION_OTP",
        "nextEvent": null,
        "breakingAction": null,
        "nonBreakingActionList": [
          {
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} nécessite d’autres actions supplémentaires: \n ${paymentExpiryDate} \n Veuillez utiliser IREMBO pour compléter votre demande et la soumettre à nouveau.",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Demande d'autres actions supplémentaires"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: Rwandan nationality by acquisition - adoption with application number ${applicationNumber} necessitates further action: \n ${paymentExpiryDate}. \n Please use IREMBO to complete your application and resubmit.",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Application requested for further action"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw'u Rwanda binyuze mu kurera ifite nomero ya dosiye ${applicationNumber} ntiyuzuye:\n ${paymentExpiryDate} \n Jya ku rubuga IREMBO wuzuze dosiye, maze wongere uyohereze.",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Dosiye ntiyuzuye"
              }
            }
          }
        ]
      },
      "endStateTwo": null
    },
    {
      "startState": "PENDING_RESUBMISSION_OTP",
      "event": "RESUBMIT",
      "endStateOne": {
        "stateName": "Pending approval",
        "stateCode": "PENDING_APPROVAL",
        "nextEvent": null,
        "breakingAction": null,
        "nonBreakingActionList": [
          {
            "actionType": "NOTIFICATION",
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption avec le numéro de facturation  ${billId}  a été renvoyée avec succès! \n Vous pouvez suivre votre demande avec les détails suivants: \n Numéro de demande:: ${applicationNumber}",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Demande renvoyée"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME},Your application for: Rwandan nationality by acquisition - adoption with billing number ${billId} was successfully resubmitted! \n You can track your application with the following details: \n Application number: ${applicationNumber}",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Application resubmitted"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},Dosiye yawe isaba: Ubwenegihugu bw’u Rwanda binyuze mu kurera ifite kode yo kwishyura ${billId} yongeye koherezwa! \n Kurikirana dosiye yawe ukoresheje aya makuru: \n Nomero ya dosiye: ${applicationNumber}",
                "emailTemplate": "Cher ${APPLICANT_LAST_NAME},Votre demande de: Nationalité rwandaise par acquisition pour cause d'adoption aavec le numéro de demande ${applicationNumber} a été approuvée!\n Veuillez vous adresser à la DGIE pour votre prestation de serment et le retrait de votre attestation de nationalité le ${paymentExpiryDate}.",
                "notificationTitle": "Dosiye yongeye koherezwa"
              }
            }
          }
        ]
      },
      "endStateTwo": null
    }
  ];

  public static sample1 = [
    {
      "event": "CREATE",
      "startState": "NEW",
      "endStateOne": {
        "nextEvent": null,
        "stateCode": "PAYMENT_PENDING",
        "stateName": "Payment Pending",
        "breakingAction": { "args": null, "actionType": "BILL_ID_GENERATION" },
        "nonBreakingActionList": [
          {
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Mr/Mme ${APPLICANT_LAST_NAME}, votre dossier de demande de: ${serviceName} avec code de facturation ${billId} a été envoyé avec succès! Statut: En attente de paiement, Montant à payer: ${feeAmount} ${currency}, Date limite de paiement: ${paymentExpiryDate}",
                "emailTemplate": "Mr/Mme ${APPLICANT_LAST_NAME}, votre dossier de demande de: ${serviceName} avec code de facturation ${billId} a été envoyé avec succès! Statut: En attente de paiement, Montant à payer: ${feeAmount} ${currency}, Date limite de paiement: ${paymentExpiryDate}",
                "notificationTitle": "${serviceName} - Code de facturation ${billId}"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: ${serviceName} with billing number ${billId} was successfully submitted! Status: Payment Pending, Fees to be paid: ${feeAmount} ${currency}, Payment due date: ${paymentExpiryDate}",
                "emailTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: ${serviceName} with billing number ${billId} was successfully submitted! Status: Payment Pending, Fees to be paid: ${feeAmount} ${currency}, Payment due date: ${paymentExpiryDate}",
                "notificationTitle": "${serviceName} - Billing Number ${billId}"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME}, dosiye yawe isaba: ${serviceName} ifite kode yo kwishyuriraho ${billId} yoherejewe neza! Aho dosiye igeze: Itegereje kwishyurwa, Amafaranga uzishyura: ${feeAmount} ${currency}",
                "emailTemplate": "Kuri ${APPLICANT_LAST_NAME}, dosiye yawe isaba: ${serviceName} ifite kode yo kwishyuriraho ${billId} yoherejewe neza! Aho dosiye igeze: Itegereje kwishyurwa, Amafaranga uzishyura: ${feeAmount} ${currency}",
                "notificationTitle": "${serviceName} - Kode yo kwishyuriraho ${billId}"
              }
            },
            "actionType": "NOTIFICATION"
          }
        ]
      },
      "endStateTwo": null
    },
    {
      "event": "PAY",
      "startState": "PAYMENT_PENDING",
      "endStateOne": {
        "nextEvent": "PUSH",
        "stateCode": "PAID",
        "stateName": "Paid",
        "breakingAction": null,
        "nonBreakingActionList": [
          {
            "args": {
              "frenchNotificationTemplate": {
                "smsTemplate": "Cher/Chère ${APPLICANT_LAST_NAME},  Votre demande de: ${serviceName} avec le numéro de facturation ${billId} a été payée avec succès! Numéro du dossier: ${applicationNumber}, Montant payé:  ${feeAmount} ${currency}",
                "emailTemplate": "Cher/Chère ${APPLICANT_LAST_NAME},  Votre demande de: ${serviceName} avec le numéro de facturation ${billId} a été payée avec succès! Numéro du dossier: ${applicationNumber}, Montant payé:  ${feeAmount} ${currency}",
                "notificationTitle": "Paiement réussi - ${applicationNumber}"
              },
              "englishNotificationTemplate": {
                "smsTemplate": "Dear ${APPLICANT_LAST_NAME},  Your application for: ${serviceName} with billing number ${billId} was successfully paid! You can track your application with the following details! Application number: ${applicationNumber} Fees paid:  ${feeAmount} ${currency}",
                "emailTemplate": "Dear ${APPLICANT_LAST_NAME},  Your application for: ${serviceName} with billing number ${billId} was successfully paid! You can track your application with the following details! Application number: ${applicationNumber} Fees paid:  ${feeAmount} ${currency}",
                "notificationTitle": "Payment Successful - ${applicationNumber}"
              },
              "kinyarwandaNotificationTemplate": {
                "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},  Dosiye yawe isaba: ${serviceName} Ifite kode yo kwishyuriraho ${billId} yishyuwe! Nomero ya dosiye: ${applicationNumber}, Amafaranga yishyuwe:  ${feeAmount} ${currency}",
                "emailTemplate": "Kuri ${APPLICANT_LAST_NAME},  Dosiye yawe isaba: ${serviceName} Ifite kode yo kwishyuriraho ${billId} yishyuwe! Nomero ya dosiye: ${applicationNumber}, Amafaranga yishyuwe:  ${feeAmount} ${currency}",
                "notificationTitle": "Dosiye yawe yishyuwe - ${applicationNumber}"
              }
            },
            "actionType": "NOTIFICATION"
          }
        ]
      },
      "endStateTwo": null
    },
    {
      "event": "PUSH",
      "startState": "PAID",
      "endStateOne": {
        "nextEvent": null,
        "stateCode": "SUBMITTED",
        "stateName": "Submitted",
        "breakingAction": {
          "args": { "serviceName": "ID_FOR_PRISONER_PAYMENT" },
          "actionType": "INTEGRATION"
        },
        "nonBreakingActionList": null
      },
      "endStateTwo": null
    }
  ]

  public static getApplyPayPushWorkflow() {

    return [
      {
        "event": "CREATE",
        "startState": "NEW",
        "endStateOne": {
          "nextEvent": null,
          "stateCode": "PAYMENT_PENDING",
          "stateName": "Payment Pending",
          "breakingAction": { "args": null, "actionType": "BILL_ID_GENERATION" },
          "nonBreakingActionList": [
            {
              "args": {
                "frenchNotificationTemplate": {
                  "smsTemplate": "Mr/Mme ${APPLICANT_LAST_NAME}, votre dossier de demande de: ${serviceName} avec code de facturation ${billId} a été envoyé avec succès! Statut: En attente de paiement, Montant à payer: ${feeAmount} ${currency}, Date limite de paiement: ${paymentExpiryDate}",
                  "emailTemplate": "Mr/Mme ${APPLICANT_LAST_NAME}, votre dossier de demande de: ${serviceName} avec code de facturation ${billId} a été envoyé avec succès! Statut: En attente de paiement, Montant à payer: ${feeAmount} ${currency}, Date limite de paiement: ${paymentExpiryDate}",
                  "notificationTitle": "${serviceName} - Code de facturation ${billId}"
                },
                "englishNotificationTemplate": {
                  "smsTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: ${serviceName} with billing number ${billId} was successfully submitted! Status: Payment Pending, Fees to be paid: ${feeAmount} ${currency}, Payment due date: ${paymentExpiryDate}",
                  "emailTemplate": "Dear ${APPLICANT_LAST_NAME}, Your application for: ${serviceName} with billing number ${billId} was successfully submitted! Status: Payment Pending, Fees to be paid: ${feeAmount} ${currency}, Payment due date: ${paymentExpiryDate}",
                  "notificationTitle": "${serviceName} - Billing Number ${billId}"
                },
                "kinyarwandaNotificationTemplate": {
                  "smsTemplate": "Kuri ${APPLICANT_LAST_NAME}, dosiye yawe isaba: ${serviceName} ifite kode yo kwishyuriraho ${billId} yoherejewe neza! Aho dosiye igeze: Itegereje kwishyurwa, Amafaranga uzishyura: ${feeAmount} ${currency}",
                  "emailTemplate": "Kuri ${APPLICANT_LAST_NAME}, dosiye yawe isaba: ${serviceName} ifite kode yo kwishyuriraho ${billId} yoherejewe neza! Aho dosiye igeze: Itegereje kwishyurwa, Amafaranga uzishyura: ${feeAmount} ${currency}",
                  "notificationTitle": "${serviceName} - Kode yo kwishyuriraho ${billId}"
                }
              },
              "actionType": "NOTIFICATION"
            }
          ]
        },
        "endStateTwo": null
      },
      {
        "event": "PAY",
        "startState": "PAYMENT_PENDING",
        "endStateOne": {
          "nextEvent": "PUSH",
          "stateCode": "PAID",
          "stateName": "Paid",
          "breakingAction": null,
          "nonBreakingActionList": [
            {
              "args": {
                "frenchNotificationTemplate": {
                  "smsTemplate": "Cher/Chère ${APPLICANT_LAST_NAME},  Votre demande de: ${serviceName} avec le numéro de facturation ${billId} a été payée avec succès! Numéro du dossier: ${applicationNumber}, Montant payé:  ${feeAmount} ${currency}",
                  "emailTemplate": "Cher/Chère ${APPLICANT_LAST_NAME},  Votre demande de: ${serviceName} avec le numéro de facturation ${billId} a été payée avec succès! Numéro du dossier: ${applicationNumber}, Montant payé:  ${feeAmount} ${currency}",
                  "notificationTitle": "Paiement réussi - ${applicationNumber}"
                },
                "englishNotificationTemplate": {
                  "smsTemplate": "Dear ${APPLICANT_LAST_NAME},  Your application for: ${serviceName} with billing number ${billId} was successfully paid! You can track your application with the following details! Application number: ${applicationNumber} Fees paid:  ${feeAmount} ${currency}",
                  "emailTemplate": "Dear ${APPLICANT_LAST_NAME},  Your application for: ${serviceName} with billing number ${billId} was successfully paid! You can track your application with the following details! Application number: ${applicationNumber} Fees paid:  ${feeAmount} ${currency}",
                  "notificationTitle": "Payment Successful - ${applicationNumber}"
                },
                "kinyarwandaNotificationTemplate": {
                  "smsTemplate": "Kuri ${APPLICANT_LAST_NAME},  Dosiye yawe isaba: ${serviceName} Ifite kode yo kwishyuriraho ${billId} yishyuwe! Nomero ya dosiye: ${applicationNumber}, Amafaranga yishyuwe:  ${feeAmount} ${currency}",
                  "emailTemplate": "Kuri ${APPLICANT_LAST_NAME},  Dosiye yawe isaba: ${serviceName} Ifite kode yo kwishyuriraho ${billId} yishyuwe! Nomero ya dosiye: ${applicationNumber}, Amafaranga yishyuwe:  ${feeAmount} ${currency}",
                  "notificationTitle": "Dosiye yawe yishyuwe - ${applicationNumber}"
                }
              },
              "actionType": "NOTIFICATION"
            }
          ]
        },
        "endStateTwo": null
      },
      {
        "event": "PUSH",
        "startState": "PAID",
        "endStateOne": {
          "nextEvent": null,
          "stateCode": "SUBMITTED",
          "stateName": "Submitted",
          "breakingAction": {
            "args": { "serviceName": "ID_FOR_PRISONER_PAYMENT" },
            "actionType": "INTEGRATION"
          },
          "nonBreakingActionList": null
        },
        "endStateTwo": null
      }
    ]
  }
}


