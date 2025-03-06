const {
  Category,
  Item,
  User,
  Order,
  OrderItem,
  UserProfile,
} = require("../models");
const nodemailer = require("nodemailer");

class OrderController {
  static async addToCart(req, res) {
    try {
      const { userId } = req.session;
      const { id } = req.params;

      let quantity = 1;
      let order = await Order.findOne({
        where: { UserId: +userId, status: "pending" },
      });
      if (!order) {
        order = await Order.create({ UserId: +userId });
      }
      let orderItem = await OrderItem.findOne({
        where: { OrderId: order.id, ItemId: +id },
      });

      if (orderItem) {
        await orderItem.update({ quantity: orderItem.quantity + quantity });
        await Item.decrement({ stock: 1 }, { where: { id: +id } });
      } else {
        await OrderItem.create({
          OrderId: order.id,
          ItemId: +id,
          quantity: quantity,
        });
      }
      res.redirect(`/detail/${id}`);
    } catch (error) {
      res.send(error);
    }
  }

  static async showCart(req, res) {
    try {
      let { userId, role } = req.session;

      let info = {
        isLoggedIn: false,
        isAdmin: false,
        profile: false,
      };
      if (userId) {
        info.isLoggedIn = true;
        if (role === "admin") {
          info.isAdmin = true;
        }
        let userProfile = await UserProfile.findOne({
          where: { UserId: userId },
        });
        if (userProfile) {
          info.profile = true;
        }
      }
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [Item],
          },
        ],
        where: {
          UserId: +userId,
          status: "pending",
        },
      });
      let user = await UserProfile.findOne({
        where: { UserId: +userId },
      });
      console.log(user, userId);
      if (!orders || orders.length === 0) {
        res.render("noOrder", { info, userId });
      }
      let formattedOrders = orders.map((order) => {
        const items = order.OrderItems.map((orderItem) => ({
          id: orderItem.Item.id,
          title: orderItem.Item.title,
          price: orderItem.Item.price,
          quantity: orderItem.quantity,
          itemTotal: orderItem.Item.price * orderItem.quantity,
          photoURL: orderItem.Item.photoURL,
        }));
        let total = 0;
        for (const item of items) {
          total += item.itemTotal;
        }
        return { items, total };
      });

      formattedOrders = formattedOrders[0];

      res.render("cart", { formattedOrders, user, userId, info });
    } catch (error) {
      res.send(error);
    }
  }
  static async checkout(req, res) {
    try {
      const { userId } = req.session;
      const order = await Order.findOne({
        where: { UserId: +userId, status: "pending" },
      });
      await Order.update(
        { status: "completed" },
        {
          where: { id: order.id },
        }
      );
      const user = await User.findOne({ where: { id: +userId } });
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Confirmation Code",
        text: `Your confirmation code is: 123433`,
      };
      await transporter.sendMail(mailOptions);
      console.log("email sent success");
      res.redirect("/cart");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = OrderController;
