import cron from 'node-cron';
import Product from '../models/Product';

cron.schedule('* * * * *', async () => {
  const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);

  try {
    const result = await Product.deleteMany({
      status: 'handed_over',
      updatedAt: { $lt: tenDaysAgo },
    });

    console.log(
      `[CRON] Deleted ${result.deletedCount} old handed_over products`
    );
  } catch (err) {
    console.error('[CRON] Error:', err);
  }
});
