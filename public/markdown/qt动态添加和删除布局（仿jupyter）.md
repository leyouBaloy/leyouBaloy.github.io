---
title: "Qt动态添加和删除布局（仿jupyter）"
author: 孙百乐
date: 2023-02-02T14:14:19+08:00
draft: false
categories: 
- 技能分享
- 笔记
---

## 前言

老师给了一个任务，仿照jupyter notebook中可以动态添加、删除的cell，用c++的qt做一个类似的界面。具体来说，一个cell中有一个输入框，一个输出框，还有四个按钮，分别是`运行`、`添加`、`删除`、`清空`。此外，为了突出正在编辑的cell，要实现点击到cell的空白部分时，将背景颜色高亮。实现的效果如下：![ezgif.com-gif-maker](https://myblog-1257298572.cos.ap-shanghai.myqcloud.com/img/ezgif.com-gif-maker.gif)

虽然我压根就没学过qt，但是刚接到任务时，我觉得这玩意逻辑挺简单的，应该不难实现。但是后来发现我错了，要做这么一个小东西要用到很多知识。

## 实现

因为ui比较简单，所以用代码实现，没用designer。先整一个自定义组件叫cell（也就是一个类，继承自QWidget），cell里面包含了两个输入框和四个按钮，在public中定义这四个按钮，保证这四个按钮可以被外部访问到。

用一个QList把所有的cell存储起来，界面和这个QList一一对应，这样，添加和删除cell，就等于添加和删除QList。写一个渲染函数render，把已有的布局全删了，根据QList重新构建，每次进行一个操作之后都重新render。

怎么连接信号与槽呢？因为要实现的逻辑与全局有关，不能在cell内写connect，只能在外面的mainwindow里写，这就是为什么要保证四个按钮可以被外部访问到。因为按钮长得都一模一样，所以要区分按下的是哪一个cell的按钮，所以得用到传参的信号与槽，参数就是按钮的索引位置。这些都是写在render函数里的，别忘了在connect前先disconnect一下，清除原有的信号与槽。

最后，怎么点击背景改变颜色呢？先用groupbox把四个按钮和两个输入输出框包裹起来，然后想到直接用groupbox的click信号，但是我发现这玩意不生效（毕竟人家本来的作用不是拿来干这个的），所以换一种方法。我定义了一个myGroupBox类，继承自QGroupBox，然后重写了它的QMousePressEvent函数，点击就能发出bg_clicked信号（自定义信号），这个信号被mainwindow接收到就可以控制它的stylesheet啦。

代码：

cell.h

```cpp
#ifndef CELL_H
#define CELL_H

#include <QWidget>
#include <QTextEdit>
#include <QPushButton>
#include <QVBoxLayout>
#include <QTextEdit>
#include "mygroupbox.h"

class Cell: public QWidget
{
    Q_OBJECT
public:
    explicit Cell(QWidget *parent = nullptr);
    ~Cell();

    // 一些控件
    myGroupBox *m_box;
    QPushButton *m_btnAdd;
    QPushButton *m_btnDelete;
    QPushButton *m_btnClear;
    QPushButton *m_btnRun;
    QTextEdit *m_input;
    QTextEdit *m_output;

    // 属性：是否被选中
    bool is_clicked=false;

private:
    void init(); // 初始化内部控件

signals:

public slots:

};

#endif // CELL_H

```

mygroupbox.h

```cpp
#ifndef MYGROUPBOX_H
#define MYGROUPBOX_H

#include <QGroupBox>

class myGroupBox : public QGroupBox
{
    Q_OBJECT
public:
    explicit myGroupBox(QWidget *parent = nullptr);

    // 鼠标点击
    virtual void mousePressEvent(QMouseEvent *ev);



signals:
    void bg_clicked(); // 背景（groupbox）被点击后变色

public slots:
};

#endif // MYGROUPBOX_H

```



mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTextEdit>
#include <QPushButton>
#include <QVBoxLayout>
#include <QTextEdit>
#include "mygroupbox.h"
#include "cell.h"


QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    // 设置一个主widget
    QWidget *widget;
    // 设置一个mainLayout
    QVBoxLayout *mainLayout;
    // 绘制
    void render();
    // 递归的清除所有布局以及控件
    void deleteAllitemsOfLayout(QLayout* layout);
    // 设置一个list存储所有的cell
    QList<Cell*> cells;

    // 按钮所触发的函数，传入按钮相对应的索引
    void on_btnAdd_clicked(int i);
    void on_btnDelete_clicked(int i);
    void on_btnClear_clicked(int i);
    void on_btnRun_clicked(int i);
    void on_box_clicked(int i);


private slots:


private:
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H

```

cell.cpp

```cpp
#include "cell.h"
#include <QDebug>

Cell::Cell(QWidget *parent) : QWidget(parent)
{
    init();
}

Cell::~Cell()
{
}

void Cell::init()
{
    m_box = new myGroupBox;
    QHBoxLayout *hlay = new QHBoxLayout;
    QVBoxLayout *vlay1 = new QVBoxLayout;
    QVBoxLayout *vlay2 = new QVBoxLayout;
    // 把按钮、文本框等控件添加进布局
    m_input = new QTextEdit;
    m_output = new QTextEdit;
    m_output->setStyleSheet("background-color:rgb(230,230,230);");
    m_output->setReadOnly(true);
    vlay2->addWidget(m_input);
    vlay2->addWidget(m_output);
    m_btnRun = new QPushButton("Run", this);
    vlay1->addWidget(m_btnRun);
    m_btnAdd = new QPushButton("Add", this);
    vlay1->addWidget(m_btnAdd);
    m_btnDelete = new QPushButton("Delete");
    vlay1->addWidget(m_btnDelete);
    m_btnClear = new QPushButton("Clear");
    vlay1->addWidget(m_btnClear);
    vlay1->addStretch();
    hlay->addLayout(vlay1);
    hlay->addLayout(vlay2);
    m_box->setLayout(hlay);
    QHBoxLayout *out = new QHBoxLayout;
    out->addWidget(m_box);
    setLayout(out);
}


```

mygroupbox.cpp

```cpp
#include "mygroupbox.h"
#include <QDebug>

myGroupBox::myGroupBox(QWidget *parent) : QGroupBox(parent)
{

}

void myGroupBox::mousePressEvent(QMouseEvent *ev)
{
//    // 新思路：发一个信号发出去给mainwindow，然后在外面处理这个
//    qDebug() << "背景被点击";
    emit this->bg_clicked();

}

```

mainwindow.cpp

```cpp
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    // 设置centralwidget和mainlayout
    widget = new QWidget();
    this->setCentralWidget(widget);
    mainLayout = new QVBoxLayout;
    widget->setLayout(mainLayout);

    // 初始化一个界面
    on_btnAdd_clicked(0);
    render();

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::render()
{
    // 清除所有布局
    deleteAllitemsOfLayout(mainLayout);
    delete mainLayout->layout();

    // 新建布局，并添加控件
    mainLayout = new QVBoxLayout;

    for(int i=0; i<cells.length(); i++){
        mainLayout->addWidget(cells.at(i));

        // 被选中的要改变背景颜色
        if( cells.at(i)->is_clicked ){
            cells.at(i)->m_box->setStyleSheet("QGroupBox{background:rgb(250,250,250)}");
        }else{
            cells.at(i)->m_box->setStyleSheet("");
        }

        // 删除原有连接
        cells.at(i)->m_btnAdd->disconnect();
        cells.at(i)->m_btnDelete->disconnect();
        cells.at(i)->m_btnClear->disconnect();
        cells.at(i)->m_btnRun->disconnect();
        cells.at(i)->m_box->disconnect();

        // 连接btnAdd
        connect(cells.at(i)->m_btnAdd, &QPushButton::clicked, this, [ = ] {
            this->on_btnAdd_clicked(i);
        });
        // 连接btnDelete
        connect(cells.at(i)->m_btnDelete, &QPushButton::clicked, this, [ = ] {
            on_btnDelete_clicked(i);
        });
        // 连接btnClear
        connect(cells.at(i)->m_btnClear, &QPushButton::clicked, this, [ = ] {
            on_btnClear_clicked(i);
        });
        // 连接btnRun
        connect(cells.at(i)->m_btnRun, &QPushButton::clicked, this, [ = ] {
            on_btnRun_clicked(i);
        });
        // 连接m_box，用于改变背景颜色
        connect(cells.at(i)->m_box, &myGroupBox::bg_clicked, this, [ = ] {
            on_box_clicked(i);
        });
    }

    mainLayout->addStretch(); // 加一个弹簧
    widget->setLayout(mainLayout);
//    widget->show();

}

void MainWindow::deleteAllitemsOfLayout(QLayout *layout)
{
    QLayoutItem *child;
            while ((child = layout->takeAt(0)) != nullptr)
            {
                ///setParent为NULL，防止删除之后界面不消失
                if(child->widget())
                {
                    child->widget()->setParent(nullptr);
                }else if(child->layout()){
                    deleteAllitemsOfLayout(child->layout());
                }
                delete child;
            }
}

void MainWindow::on_btnAdd_clicked(int i)
{
    qDebug() << "添加：" << i;
    Cell *new_cell = new Cell;
    cells.append(new_cell);
    this->render();
}

void MainWindow::on_btnDelete_clicked(int i)
{
    qDebug() << "删除：" << i;
    QWidget* w = cells.at(i);
    delete w;
    cells.removeAt(i);
    this->render();
}

void MainWindow::on_btnClear_clicked(int i)
{
    qDebug() << "清空：" << i;
    cells.at(i)->m_input->clear();
}

void MainWindow::on_btnRun_clicked(int i)
{
    qDebug() << "Run第" << i << "个";
}

void MainWindow::on_box_clicked(int i)
{
    qDebug() << "第" << i << "个box被点击";
    cells.at(i)->is_clicked = true;
    for( int j=0; j<cells.length(); j++ ){
        if( cells.at(j)->is_clicked && j!=i){
            cells.at(j)->is_clicked = false;
        }
    }
    this->render();

}
```

涉及到项目其它内容，mainwindow.cpp就截选了一部分，仅供学习。

## 学习历程

虽然我没有学过qt，但是我学过vue，前端的框架在设计理念上都是相通的，所以我对qt中的一些概念能很快理解，比如信号与槽，控件等等。但是web前端的编程环境跟c++大不一样，所以适应起来还是需要一段时间的。

刚开始学一门技术，并且立刻拿它来做项目确实是很头疼的，但这也是最锻炼人的方式。恭喜我，在堕落的寒假的尾声终于又点亮了一颗技能树。
