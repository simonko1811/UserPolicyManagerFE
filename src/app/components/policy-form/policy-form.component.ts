import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../services/policy.service';
import { Policy } from '../../models/policy';

@Component({
  selector: 'app-policy-form',  
  standalone: false,
  templateUrl: './policy-form.component.html',
})
export class PolicyFormComponent implements OnInit {
  policy: Policy = {
    id: '',
    name: '',
    condition: {
      rule: '',
      value: ''
    }
  };

  isEditMode = false;
  message = '';

  constructor(
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.policyService.getPolicy(id).subscribe(policy => {
        this.policy = policy;
      });
    }
  }

  onSubmit(): void {        
    if (!this.isEditMode) {
      this.policy.id = this.generateIdFromName(this.policy.name);
    }

    this.policy.condition.rule = this.normalizeRule(this.policy.condition.rule);

    const action = this.isEditMode
      ? this.policyService.updatePolicy(this.policy.id, this.policy)
      : this.policyService.addPolicy(this.policy);

    action.subscribe({
      next: () => this.router.navigate(['/policies']),
      error: (err) => {
        console.error('Policy save failed:', err);
        this.message = 'Error saving policy.';
      }
    });
  }

  private generateIdFromName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumerics with -
      .replace(/(^-|-$)/g, '');    // trim leading/trailing -
  }

  private normalizeRule(rule: string): string {
    return rule
    .trim()
    .split(/[^a-zA-Z0-9]+/) // rozdelí podľa medzier a špeciálnych znakov
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1) // prvé slovo malým
        : word.charAt(0).toUpperCase() + word.slice(1) // ďalšie veľkým
    )
    .join('');
}

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
