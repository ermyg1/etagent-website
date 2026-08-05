const groups = {
  'Data and system access': [
    'real bank-system access',
    'account lookup',
    'real customer-data access',
  ],
  'Financial action': [
    'money movement',
    'reimbursement',
    'excess application',
    'account restriction',
    'account freezing',
    'payment blocking',
  ],
  Communication: ['customer communication', 'receiving-provider communication'],
  Reporting: [
    'police reporting',
    'Action Fraud reporting',
    'suspicious activity reporting',
    'regulatory reporting',
    'complaint closure',
  ],
  'Automated determinations': [
    'automated vulnerability classification',
    'autonomous fraud determination',
    'autonomous reimbursement decision',
    'AML, sanctions or credit determination',
  ],
  'Persistence and observation': [
    'persistent banking-data storage',
    'analytics involving case data',
    'external logging of case data',
  ],
  Execution: ['all external and operational execution'],
}

export function GovernanceControls() {
  return (
    <>
      <p className="bank-notice">
        <strong>All capabilities below are blocked.</strong> They are boundaries, not controls. No
        prohibited language can create operational authority.
      </p>
      <div className="bank-governance">
        {Object.entries(groups).map(([name, items]) => (
          <details key={name} open>
            <summary>{name} — blocked</summary>
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <strong>Blocked:</strong> {item}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </>
  )
}
