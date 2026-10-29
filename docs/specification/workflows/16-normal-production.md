# Normal production

Status: authoritative extracted specification; target behavior, not implementation evidence.
Source: [docs/mobile-first-workflow-ui-plan.md — Normal production](../../mobile-first-workflow-ui-plan.md#normal-production)

<a id="wf-16-01"></a>
<!-- requirement:WF-16-01 -->
Use short guided tasks with a review screen before each commit:
<!-- /requirement:WF-16-01 -->

<a id="wf-16-02"></a>
<!-- requirement:WF-16-02 -->
1. **Process honey:** select eligible source buckets/lots, enter quantities taken,
   record facility, operator, processing time, outputs and losses, then confirm.
   Honeycomb extraction separates honey, **raw wax residue retained for processing**, waste and losses. Raw wax is not finished wax.
<!-- /requirement:WF-16-02 -->

<a id="wf-16-03"></a>
<!-- requirement:WF-16-03 -->
2. **Check for bottling:** collect the required measurements/evidence for the
   processed lot. The quality manager records the applicable release decision.
<!-- /requirement:WF-16-03 -->

<a id="wf-16-04"></a>
<!-- requirement:WF-16-04 -->
3. **Bottle honey:** select released source lots and quantities, package size,
   actual number of jars and bottling date. Reconcile bottled quantity and
   recorded remaining material/losses, then commit the packaging run.
<!-- /requirement:WF-16-04 -->

<a id="wf-16-05"></a>
<!-- requirement:WF-16-05 -->
4. **Label and publish:** assign the finished batch/lot code, review and print
   labels, complete the required packaging release and approve/publish the public
   page. Show publication readiness separately; printed labels alone do not mean
   a batch is published or ready for distribution.
<!-- /requirement:WF-16-05 -->

<a id="wf-16-06"></a>
<!-- requirement:WF-16-06 -->
Partial use and blending retain exact direct allocations and every ancestor; calculated source contributions retain their method and assumptions. The
server checks available quantities and current dispositions at commit time.
Stale screens, double taps and concurrent staff actions cannot over-allocate
stock. Traceability, quantity and public history survive corrections.
<!-- /requirement:WF-16-06 -->
