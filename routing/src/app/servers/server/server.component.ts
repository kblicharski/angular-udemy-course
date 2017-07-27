import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ServersService } from '../servers.service';

@Component(
  {
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
  }
)
export class ServerComponent implements OnInit, OnDestroy {
  server: { id: number, name: string, status: string };
  serverSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      );
  }

  ngOnDestroy() {
    this.serverSubscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'],
                         {relativeTo: this.route,
                          queryParamsHandling: 'preserve'});
  }
}
