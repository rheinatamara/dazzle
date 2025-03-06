const {
  Category,
  Item,
  User,
  Order,
  OrderItem,
  UserProfile,
} = require("../models");

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
      userId = 2;
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            include: [Item],
          },
        ],
        where: {
          UserId: +userId,
        },
      });
      let user = await UserProfile.findOne({
        where: { UserId: +userId },
      });

      if (!orders || orders.length === 0) {
        res.send("no order");
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

      if (user) {
        return res.render("cart", { formattedOrders, user, info, userId });
      }

      res.render("cart", { formattedOrders });
    } catch (error) {
      res.send(error);
    }
  }
  static async checkout(req, res) {
    try {
      //notif order telah dibuat, ganti order status jadi completed dan send email lewat email.js
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = OrderController;
