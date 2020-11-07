import { NgxPermissionsService } from 'ngx-permissions';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PoliciesService {

  private policies = [];
  private _policiesArr = []
  private _currentUser: any;

  constructor(private permissionsService: NgxPermissionsService) { }

  get viewPolicies(): any {
    return this.policies
  }

  setPoliciesToUser(): void {

    let _currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    let _backendPolicies = _currentUser.administrativeData
    let _policies

    this.flushPolicies()

    _backendPolicies.forEach(element => {

      let _p = this.parse(element)
      let _pArr = this.makePolicy(_p)

      this.policies.push({
        'clinic': element.clinicId,
        'policies': _pArr
      })
    });

    localStorage.setItem('policies', JSON.stringify(this.policies));

    this.policies.forEach(element => {

      console.log(element.policies)

      if (element.clinic == localStorage.getItem('clinic')) {
        this.permissionsService.loadPermissions(element.policies);
      }
    });

    this.listPolicies()
  }

  flushPolicies(): void {
    localStorage.removeItem('policies');
    this.permissionsService.flushPermissions();
    this.policies = []
    this._policiesArr = []
  }

  listPolicies() {
    var permissions = this.permissionsService.getPermissions();

    this.permissionsService.permissions$.subscribe((permissions) => {
      console.log(permissions)
    })
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
