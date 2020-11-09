
export class PoliciesService {

  private policies = [];
  private _policiesArr = []

  constructor(private _policies: any) {

    if (_policies.length > 1) {
      _policies.forEach(element => {

        let _p = this.parse(element)
        let _pArr = this.makePolicy(_p)

        this.policies.push({
          'clinic': element.clinicId,
          'policies': _pArr
        })
      });
    } else {
      let _p = this.parse(_policies)
      let _pArr = this.makePolicy(_p)

      this.policies.push({
        'clinic': _policies.clinicId,
        'policies': _pArr
      })
    }
    console.log(this.policies);
  }

  get viewPolicies(): any {
    return this.policies
  }

  parse(_policies: any): any {
    let _rt: Object = {};

    for (const key in _policies) {
      if (Object.prototype.hasOwnProperty.call(_policies, key)) {
        const element = _policies[key];

        if (key == 'policies') {
          for (const policy in _policies.policies) {
            if (Object.prototype.hasOwnProperty.call(_policies.policies, policy)) {
              const element = _policies.policies[policy];

              let _policyName = policy.replace('Policies', '')
              let _policy = _policyName.charAt(0).toUpperCase() + _policyName.slice(1)

              _rt[_policy] = []

              for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key)) {
                  const _el = element[key];

                  if (_el) {
                    _rt[_policy].push(key)
                  }
                }
              }

            }
          }
        }
      }
    }

    return _rt;

  }

  makePolicy(_rt: any): any {
    let _arr = [];

    for (const Resource in _rt) {
      if (Object.prototype.hasOwnProperty.call(_rt, Resource)) {
        const element = _rt[Resource];

        element.forEach(permission => {

          let _permission = permission.charAt(0).toUpperCase() + permission.slice(1)
          _arr.push(_permission + ':' + Resource)
        });
      }
    }

    return _arr
  }
}
