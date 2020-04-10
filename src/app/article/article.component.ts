import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article';
import { ArticleService } from '../article.service';
import { Title, Meta } from '@angular/platform-browser';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article = new Article();

  constructor(
    private route: ActivatedRoute,
    private articleservice: ArticleService,
    private router: Router,
    private titleService: Title,
    private sharedService: SharedService,
    private meta: Meta
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
    const key = params.key; 
    this.articleservice.getArticle(key).subscribe(article => {
      if(article == undefined)
      {
        this.router.navigateByUrl('404');
        return;
      }
        this.article = article;
        this.titleService.setTitle(
        `${this.article.title} - ${this.sharedService.blogTitle}`);

        this.meta.addTags([
          { name: "description", content: this.article.description },
          { 
            name: "og:title", 
            content: `${this.article.title} - ${this.sharedService.blogTitle}` 
          },
          { 
            name: "og:type", 
            content: "Website" 
          },
          { 
            name: "og:type", 
            content: "Website" 
          },
          { 
            name: "og:url", 
            content: this.sharedService.baseUrl + this.article.key 
          },
          { 
            name: "og:image", 
            content: this.article.imageUrl 
          },
          { 
            name: "og:description", 
            content: this.article.description 
          },
          { 
            name: "og:site_name", 
            content: this.sharedService.blogTitle 
          }
          
        ]);
      }
    )
  });
}
}
