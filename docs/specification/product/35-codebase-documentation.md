# Codebase documentation

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [HB-TRACE-V1-PLAN.md — Codebase documentation](../../../HB-TRACE-V1-PLAN.md#codebase-documentation)

<a id="prd-35-01"></a>
<!-- requirement:PRD-35-01 -->
V1 stores concise, versioned documentation with the code rather than building a documentation platform. It has
three maintained entry paths:
<!-- /requirement:PRD-35-01 -->

<a id="prd-35-02"></a>
<!-- requirement:PRD-35-02 -->
- **Staff:** a plain-language quick start, common workflows, status terminology, offline/sync troubleshooting,
  privacy boundaries and links to current controlled SOPs. Cache only the approved pages needed offline.
<!-- /requirement:PRD-35-02 -->

<a id="prd-35-03"></a>
<!-- requirement:PRD-35-03 -->
- **Developers:** repository map, dependency directions, domain invariants, setup, migrations, Supabase database/Auth/Storage
  adapters, API, sync protocol, testing, backup/restore and the funded-provider migration contract.
<!-- /requirement:PRD-35-03 -->

<a id="prd-35-04"></a>
<!-- requirement:PRD-35-04 -->
- **Approved AI assistants:** a concise root `AGENTS.md` identifying source-of-truth files, safe commands, required
  tests, generated/licensed/sensitive locations and rules prohibiting production data or credentials in prompts.
<!-- /requirement:PRD-35-04 -->

<a id="prd-35-05"></a>
<!-- requirement:PRD-35-05 -->
Documentation explains the system but never replaces a controlled SOP/HACCP record or licensed standard. Give
each maintained page an owner, audience, applicable release and review date. CI checks links, maintained commands,
OpenAPI generation and accidental secrets/private samples. A rendered searchable wiki, extensive screenshots and
formal AI-assistant evaluation are optional later deliverables, not V1 acceptance gates.
<!-- /requirement:PRD-35-05 -->
