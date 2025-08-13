
import { Component, inject, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout implements AfterViewInit {

  router = inject(Router);

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('leaveUser');
    localStorage.removeItem('loginDateTime');
    this.router.navigateByUrl('/login');
  }

  ngAfterViewInit() {
    // Navigation link active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const page = link.getAttribute('data-page');
        console.log('Navigating to:', page);
      });
    });

    // Parallax effect for sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        (sidebar as HTMLElement).style.transform = `translate(${x * 2}px, ${y * 2}px)`;
      });
    }
  }
}
