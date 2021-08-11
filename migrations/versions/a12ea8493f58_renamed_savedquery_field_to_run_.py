"""renamed savedquery field to run_frequency

Revision ID: a12ea8493f58
Revises: 2a04536c206b
Create Date: 2021-08-10 20:11:16.728175

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a12ea8493f58'
down_revision = '2a04536c206b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('saved_query', sa.Column('run_frequency', sa.String(length=30), nullable=False))
    op.drop_column('saved_query', 'frequency')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('saved_query', sa.Column('frequency', sa.VARCHAR(length=30), autoincrement=False, nullable=False))
    op.drop_column('saved_query', 'run_frequency')
    # ### end Alembic commands ###