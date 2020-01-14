import { Component, OnInit } from '@angular/core';
import { Chapter } from 'src/app/interfaces/chapter';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  private chapterId: string = null;
  public chapter: Chapter = {};
  private loading: any;
  private chapterSubscription: Subscription;

  isAdmin = false;

  constructor(
    private chapterService: ChapterService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.chapterId = this.activatedRoute.snapshot.params['id'];

    if (this.chapterId) this.loadChapter();
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.chapterSubscription) this.chapterSubscription.unsubscribe();
  }

  loadChapter() {
    this.chapterSubscription = this.chapterService.getChapter(this.chapterId).subscribe(data => {
      this.chapter = data;
      if(this.authService.getAuth().currentUser.uid === 'KWQdyeuUF9gAtDdEURjvG4jt1I73')
        this.isAdmin = true;
      else
        this.isAdmin = false;
    });
  }

  async saveProduct() {
    await this.presentLoading();

    this.chapter.userId = this.authService.getAuth().currentUser.uid;

    if (this.chapterId) {
      try {
        await this.chapterService.updateChapter(this.chapterId, this.chapter);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/xp');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.chapter.createdAt = new Date().getTime();

      try {
        await this.chapterService.addChapter(this.chapter);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/xp');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
