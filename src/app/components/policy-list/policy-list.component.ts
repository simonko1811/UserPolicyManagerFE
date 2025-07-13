import { Component, OnInit } from '@angular/core';
import { Policy } from '../../models/policy';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-policy-list',
  standalone: false,
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.css'
})
export class PolicyListComponent implements OnInit {
  policies: Policy[] = [];
  loading = false;
  error: string | null = null;

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.loading = true;
    this.policyService.getPolicies().subscribe({
      next: data => {
        this.policies = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load policies.';
        this.loading = false;
      }
    });
  }
  deletePolicy(id: string): void {
    if (confirm(`Are you sure you want to delete policy "${id}"?`)) {
      this.policyService.deletePolicy(id).subscribe({
        next: () => this.loadPolicies(),
        error: () => alert('Failed to delete policy.')
      });
    }
  }
}
