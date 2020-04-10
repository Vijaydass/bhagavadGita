import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ARTICLES } from '../mock-articles';
import { ArticleService } from '../article.service';
import { Title } from '@angular/platform-browser';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
 
  articels: Article[] = []; 
  constructor(
    private articleService: ArticleService,
    private titleService: Title,
    private sharedService: SharedService
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${this.sharedService.blogTitle}`);
    this.getArticles();
  }

  getArticles(): void{
    this.articleService
    .getArticles()
    .subscribe(articles => (this.articels = articles));
  }

}
