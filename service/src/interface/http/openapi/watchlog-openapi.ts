export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "WatchLog API",
    version: "0.1.0",
    description:
      "CoreVest WatchLog. BUY requires grade A or B, RR ≥ 2, run_up_pct < 6, and a complete plan (planEntry, planStop, planTarget). No plan → no trade."
  },
  servers: [{ url: "/", description: "This server" }],
  tags: [
    { name: "Health" },
    { name: "Auth" },
    { name: "Watchlist" },
    { name: "Journal" },
    { name: "Reviews" },
    { name: "Analytics" },
    { name: "Market" }
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Liveness plus database ping",
        responses: {
          "200": {
            description: "Service and database up",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthStatus" }
              }
            }
          },
          "503": {
            description: "Database down",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthStatus" }
              }
            }
          }
        }
      }
    },
    "/api/v1/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Create an account (email + password)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthCredentials" }
            }
          }
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthSessionEnvelope" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error" },
          "409": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Sign in with email + password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AuthCredentials" }
            }
          }
        },
        responses: {
          "200": {
            description: "Signed in",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AuthSessionEnvelope" }
              }
            }
          },
          "401": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Current user",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "User",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserEnvelope" }
              }
            }
          },
          "401": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/watchlist": {
      get: {
        tags: ["Watchlist"],
        summary: "List watchlist rows",
        parameters: [
          {
            name: "scope",
            in: "query",
            schema: { type: "string", enum: ["active", "all"] },
            description: "active = one day (date or UTC today). all = every day, date descending."
          },
          {
            name: "date",
            in: "query",
            schema: { type: "string", format: "date" },
            description: "List day (YYYY-MM-DD). Used when scope is not all. Defaults to UTC today."
          }
        ],
        responses: {
          "200": {
            description: "Watchlist rows",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/WatchlistItem" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Watchlist"],
        summary: "Create a watchlist row",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WatchlistCreate" }
            }
          }
        },
        responses: {
          "201": {
            description: "Created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WatchlistEnvelope" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error" },
          "409": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/watchlist/{id}": {
      get: {
        tags: ["Watchlist"],
        summary: "Get one watchlist row",
        parameters: [{ $ref: "#/components/parameters/WatchlistId" }],
        responses: {
          "200": {
            description: "Row",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WatchlistEnvelope" }
              }
            }
          },
          "404": { $ref: "#/components/responses/Error" }
        }
      },
      patch: {
        tags: ["Watchlist"],
        summary: "Update plan / grade / context",
        parameters: [{ $ref: "#/components/parameters/WatchlistId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WatchlistPatch" }
            }
          }
        },
        responses: {
          "200": {
            description: "Updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WatchlistEnvelope" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error" },
          "404": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/watchlist/{id}/decision": {
      post: {
        tags: ["Watchlist"],
        summary: "Set BUY / WATCH / SKIP",
        description: "SKIP requires skipReason. BUY is rejected unless gates pass.",
        parameters: [{ $ref: "#/components/parameters/WatchlistId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WatchlistDecisionBody" }
            }
          }
        },
        responses: {
          "200": {
            description: "Updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WatchlistEnvelope" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error" },
          "404": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/watchlist/{id}/eligibility": {
      get: {
        tags: ["Watchlist"],
        summary: "Evaluate BUY gates without changing the row",
        parameters: [{ $ref: "#/components/parameters/WatchlistId" }],
        responses: {
          "200": {
            description: "Eligibility",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EligibilityEnvelope" }
              }
            }
          },
          "404": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/journal": {
      get: {
        tags: ["Journal"],
        summary: "List trade journal rows",
        responses: {
          "200": {
            description: "Trades",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/TradeJournal" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Journal"],
        summary: "Open a trade (entry block, before buying)",
        description: "Watchlist row must already be BUY with a complete eligible plan.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/JournalOpen" }
            }
          }
        },
        responses: {
          "201": {
            description: "Opened",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/JournalEnvelope" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error" },
          "404": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/journal/{tradeId}": {
      get: {
        tags: ["Journal"],
        summary: "Get one trade",
        parameters: [{ $ref: "#/components/parameters/TradeId" }],
        responses: {
          "200": {
            description: "Trade",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/JournalEnvelope" }
              }
            }
          },
          "404": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/journal/{tradeId}/exit": {
      post: {
        tags: ["Journal"],
        summary: "Fill the exit block",
        parameters: [{ $ref: "#/components/parameters/TradeId" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/JournalExit" }
            }
          }
        },
        responses: {
          "200": {
            description: "Closed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/JournalEnvelope" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error" },
          "404": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/trades": {
      get: {
        tags: ["Journal"],
        summary: "Same as GET /journal",
        responses: {
          "200": {
            description: "Trades",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/TradeJournal" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "List weekly reviews",
        responses: {
          "200": {
            description: "Reviews",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/WeeklyReview" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Reviews"],
        summary: "Generate and save a weekly review",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/WeeklyReviewCreate" }
            }
          }
        },
        responses: {
          "201": {
            description: "Saved",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WeeklyReviewEnvelope" }
              }
            }
          },
          "400": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/reviews/{weekStart}": {
      get: {
        tags: ["Reviews"],
        summary: "Get one weekly review",
        parameters: [
          {
            name: "weekStart",
            in: "path",
            required: true,
            schema: { type: "string", format: "date" },
            description: "Monday of the reviewed week (YYYY-MM-DD)"
          }
        ],
        responses: {
          "200": {
            description: "Review",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/WeeklyReviewEnvelope" }
              }
            }
          },
          "404": { $ref: "#/components/responses/Error" }
        }
      }
    },
    "/api/v1/analytics": {
      get: {
        tags: ["Analytics"],
        summary: "Performance snapshot",
        responses: {
          "200": {
            description: "Metrics",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { $ref: "#/components/schemas/PerformanceSnapshot" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/market": {
      get: {
        tags: ["Market"],
        summary: "Market context from DSE (placeholder until integrated)",
        responses: {
          "200": {
            description: "Context",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      nullable: true,
                      allOf: [{ $ref: "#/components/schemas/MarketContext" }]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/model-signals": {
      get: {
        tags: ["Market"],
        summary: "Model signals from DSE (placeholder until integrated)",
        responses: {
          "200": {
            description: "Signals",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/ModelSignal" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    },
    parameters: {
      WatchlistId: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" }
      },
      TradeId: {
        name: "tradeId",
        in: "path",
        required: true,
        schema: { type: "string", example: "CV-0001" }
      }
    },
    responses: {
      Error: {
        description: "Error",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorBody" }
          }
        }
      }
    },
    schemas: {
      ErrorBody: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: { message: { type: "string" } },
            required: ["message"]
          }
        }
      },
      HealthStatus: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["ok", "degraded"] },
          service: { type: "string" },
          database: { type: "string", enum: ["up", "down"] }
        }
      },
      AuthCredentials: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "you@example.com" },
          password: { type: "string", minLength: 8, format: "password" }
        }
      },
      AuthUser: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          email: { type: "string", format: "email" },
          provider: { type: "string", enum: ["local", "google", "github"] }
        }
      },
      AuthSessionEnvelope: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              token: { type: "string" },
              user: { $ref: "#/components/schemas/AuthUser" }
            }
          }
        }
      },
      UserEnvelope: {
        type: "object",
        properties: { data: { $ref: "#/components/schemas/AuthUser" } }
      },
      ModelHits: {
        type: "object",
        description: "Outcome per model horizon (3 / 5 / 7 day).",
        properties: {
          d3: { type: "boolean", nullable: true },
          d5: { type: "boolean", nullable: true },
          d7: { type: "boolean", nullable: true }
        }
      },
      TradingPlan: {
        type: "object",
        properties: {
          entry: { type: "number", nullable: true },
          stop: { type: "number", nullable: true },
          target: { type: "number", nullable: true },
          risk: { type: "number", nullable: true },
          quantity: { type: "number", nullable: true }
        }
      },
      WatchlistItem: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          date: { type: "string", format: "date" },
          scrip: { type: "string" },
          category: { type: "string", enum: ["PRIME", "GOOD", "NEW", "LIVE"] },
          prob: { type: "number", nullable: true },
          streak: { type: "integer", nullable: true },
          runUpPct: { type: "number", nullable: true },
          close: { type: "number", nullable: true },
          marketStructure: { type: "string", nullable: true },
          setupStage: { type: "string", nullable: true },
          sectorId: { type: "integer", nullable: true },
          relativeVolume: { type: "number", nullable: true },
          grade: { type: "string", enum: ["A", "B", "C"], nullable: true },
          planEntry: { type: "number", nullable: true },
          planStop: { type: "number", nullable: true },
          planTarget: { type: "number", nullable: true },
          rewardRisk: { type: "number", nullable: true },
          decision: { type: "string", enum: ["BUY", "WATCH", "SKIP"] },
          skipReason: { type: "string", nullable: true },
          status: { type: "string", enum: ["PENDING", "OPEN", "CLOSED"] },
          modelHits: { $ref: "#/components/schemas/ModelHits" },
          plan: { $ref: "#/components/schemas/TradingPlan" }
        }
      },
      WatchlistEnvelope: {
        type: "object",
        properties: { data: { $ref: "#/components/schemas/WatchlistItem" } }
      },
      WatchlistCreate: {
        type: "object",
        required: ["date", "scrip", "category"],
        properties: {
          date: { type: "string", format: "date", example: "2026-09-16" },
          scrip: { type: "string", example: "ABCD" },
          category: { type: "string", enum: ["PRIME", "GOOD", "NEW", "LIVE"] },
          prob: { type: "number", nullable: true, example: 0.82 },
          streak: { type: "integer", nullable: true, example: 3 },
          runUpPct: { type: "number", nullable: true, example: 1.2 },
          close: { type: "number", nullable: true, example: 52 },
          marketStructure: { type: "string", nullable: true, example: "UPTREND" },
          setupStage: {
            type: "string",
            nullable: true,
            example: "EARLY_BREAKOUT"
          },
          sectorId: { type: "integer", nullable: true, example: 12 },
          relativeVolume: { type: "number", nullable: true, example: 1.8 },
          grade: { type: "string", enum: ["A", "B", "C"], nullable: true },
          planEntry: { type: "number", nullable: true, example: 52.5 },
          planStop: { type: "number", nullable: true, example: 50.4 },
          planTarget: { type: "number", nullable: true, example: 56.2 },
          decision: { type: "string", enum: ["BUY", "WATCH", "SKIP"] },
          skipReason: { type: "string", nullable: true },
          modelHits: { $ref: "#/components/schemas/ModelHits" }
        }
      },
      WatchlistPatch: {
        type: "object",
        properties: {
          date: { type: "string", format: "date" },
          scrip: { type: "string" },
          category: { type: "string", enum: ["PRIME", "GOOD", "NEW", "LIVE"] },
          prob: { type: "number", nullable: true },
          streak: { type: "integer", nullable: true },
          runUpPct: { type: "number", nullable: true },
          close: { type: "number", nullable: true },
          marketStructure: { type: "string", nullable: true },
          setupStage: { type: "string", nullable: true },
          sectorId: { type: "integer", nullable: true },
          relativeVolume: { type: "number", nullable: true },
          grade: { type: "string", enum: ["A", "B", "C"], nullable: true },
          planEntry: { type: "number", nullable: true },
          planStop: { type: "number", nullable: true },
          planTarget: { type: "number", nullable: true },
          decision: { type: "string", enum: ["BUY", "WATCH", "SKIP"] },
          skipReason: { type: "string", nullable: true },
          modelHits: { $ref: "#/components/schemas/ModelHits" }
        }
      },
      WatchlistDecisionBody: {
        type: "object",
        required: ["decision"],
        properties: {
          decision: { type: "string", enum: ["BUY", "WATCH", "SKIP"] },
          skipReason: { type: "string", nullable: true }
        }
      },
      BuyDecision: {
        type: "object",
        properties: {
          allowed: { type: "boolean" },
          reasons: { type: "array", items: { type: "string" } }
        }
      },
      EligibilityEnvelope: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              item: { $ref: "#/components/schemas/WatchlistItem" },
              eligibility: { $ref: "#/components/schemas/BuyDecision" }
            }
          }
        }
      },
      TradeChecklist: {
        type: "object",
        required: ["volConfirm", "trendAlign", "notChasing", "sizeOk"],
        properties: {
          volConfirm: { type: "boolean" },
          trendAlign: { type: "boolean" },
          notChasing: { type: "boolean" },
          sizeOk: { type: "boolean" }
        }
      },
      TradeJournal: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          tradeId: { type: "string", example: "CV-0001" },
          watchlistItemId: { type: "string", format: "uuid" },
          entryDate: { type: "string", format: "date" },
          scrip: { type: "string" },
          sourceCategory: { type: "string" },
          prob: { type: "number", nullable: true },
          setupType: {
            type: "string",
            enum: ["breakout", "retest", "pullback", "swing", "bounce"]
          },
          grade: { type: "string", nullable: true },
          entryPrice: { type: "number" },
          qty: { type: "integer" },
          riskPct: { type: "number", nullable: true },
          stop: { type: "number" },
          target1: { type: "number" },
          target2: { type: "number", nullable: true },
          plannedRr: { type: "number", nullable: true },
          marketDay: {
            type: "string",
            enum: ["RED", "GREEN", "SIDE"],
            nullable: true
          },
          marketDayChangePct: { type: "number", nullable: true },
          emotion: {
            type: "string",
            enum: ["calm", "FOMO", "greedy", "anxious"],
            nullable: true
          },
          checklist: { $ref: "#/components/schemas/TradeChecklist" },
          exitDate: { type: "string", format: "date", nullable: true },
          exitPrice: { type: "number", nullable: true },
          exitReason: {
            type: "string",
            enum: ["target", "stop", "time", "discretionary", "other"],
            nullable: true
          },
          pnlPct: { type: "number", nullable: true },
          pnlAmt: { type: "number", nullable: true },
          rMultiple: { type: "number", nullable: true },
          daysHeld: { type: "integer", nullable: true },
          mfePct: { type: "number", nullable: true },
          maePct: { type: "number", nullable: true },
          modelHits: { $ref: "#/components/schemas/ModelHits" },
          violations: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "none",
                "moved_stop",
                "oversized",
                "chased",
                "early_exit",
                "late_exit",
                "revenge"
              ]
            }
          },
          lesson: { type: "string", nullable: true },
          chartFile: { type: "string", nullable: true }
        }
      },
      JournalEnvelope: {
        type: "object",
        properties: { data: { $ref: "#/components/schemas/TradeJournal" } }
      },
      JournalOpen: {
        type: "object",
        required: [
          "watchlistItemId",
          "setupType",
          "entryPrice",
          "qty",
          "stop",
          "target1",
          "checklist"
        ],
        properties: {
          watchlistItemId: { type: "string", format: "uuid" },
          setupType: {
            type: "string",
            enum: ["breakout", "retest", "pullback", "swing", "bounce"]
          },
          entryPrice: { type: "number", example: 52.5 },
          qty: { type: "integer", example: 200 },
          riskPct: { type: "number", nullable: true, example: 1.5 },
          stop: { type: "number", example: 50.4 },
          target1: { type: "number", example: 56.2 },
          target2: { type: "number", nullable: true, example: 58 },
          marketDay: {
            type: "string",
            enum: ["RED", "GREEN", "SIDE"],
            nullable: true
          },
          marketDayChangePct: { type: "number", nullable: true },
          emotion: {
            type: "string",
            enum: ["calm", "FOMO", "greedy", "anxious"],
            nullable: true
          },
          checklist: { $ref: "#/components/schemas/TradeChecklist" }
        }
      },
      JournalExit: {
        type: "object",
        required: ["exitDate", "exitPrice", "exitReason"],
        properties: {
          exitDate: { type: "string", format: "date", example: "2026-09-19" },
          exitPrice: { type: "number", example: 56.1 },
          exitReason: {
            type: "string",
            enum: ["target", "stop", "time", "discretionary", "other"]
          },
          mfePct: { type: "number", nullable: true, example: 8.1 },
          maePct: { type: "number", nullable: true, example: -2.2 },
          modelHits: { $ref: "#/components/schemas/ModelHits" },
          violations: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "none",
                "moved_stop",
                "oversized",
                "chased",
                "early_exit",
                "late_exit",
                "revenge"
              ]
            }
          },
          lesson: { type: "string", nullable: true },
          chartFile: { type: "string", nullable: true }
        }
      },
      TradeHighlight: {
        type: "object",
        properties: {
          tradeId: { type: "string" },
          scrip: { type: "string" },
          rMultiple: { type: "number", nullable: true },
          reason: { type: "string", nullable: true }
        }
      },
      WeeklyReview: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          weekStart: { type: "string", format: "date" },
          weekEnd: { type: "string", format: "date" },
          trades: { type: "integer" },
          wins: { type: "integer" },
          winRate: { type: "number", nullable: true },
          avgWinR: { type: "number", nullable: true },
          avgLossR: { type: "number", nullable: true },
          expectancy: { type: "number", nullable: true },
          adherencePct: { type: "number", nullable: true },
          winPctByCategory: { type: "object", additionalProperties: true },
          winPctBySetupType: { type: "object", additionalProperties: true },
          skippedHitRate: { type: "number", nullable: true },
          bestTrade: {
            nullable: true,
            allOf: [{ $ref: "#/components/schemas/TradeHighlight" }]
          },
          worstTrade: {
            nullable: true,
            allOf: [{ $ref: "#/components/schemas/TradeHighlight" }]
          },
          topMistake: { type: "string", nullable: true },
          nextWeekFocus: { type: "string", nullable: true },
          summary: { type: "string", nullable: true }
        }
      },
      WeeklyReviewEnvelope: {
        type: "object",
        properties: { data: { $ref: "#/components/schemas/WeeklyReview" } }
      },
      WeeklyReviewCreate: {
        type: "object",
        required: ["weekStart"],
        properties: {
          weekStart: { type: "string", format: "date", example: "2026-09-14" },
          topMistake: { type: "string", nullable: true },
          nextWeekFocus: { type: "string", nullable: true }
        }
      },
      PerformanceSnapshot: {
        type: "object",
        properties: {
          expectancy: { type: "number", nullable: true },
          averageRMultiple: { type: "number", nullable: true },
          adherencePct: { type: "number", nullable: true }
        }
      },
      MarketContext: {
        type: "object",
        properties: {
          asOf: { type: "string" },
          structure: { type: "string" }
        }
      },
      ModelSignal: {
        type: "object",
        properties: {
          symbol: { type: "string" },
          generatedAt: { type: "string" },
          signal: { type: "string" }
        }
      }
    }
  }
} as const;
